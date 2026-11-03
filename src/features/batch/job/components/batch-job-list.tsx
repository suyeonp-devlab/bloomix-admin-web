"use client";

import { usePathname, useRouter } from "next/navigation";
import { DataTable } from "@/components/data/data-table";
import type { DataTableColumn } from "@/components/data/data-table";
import { Pagination } from "@/components/data/pagination";
import { FormSection } from "@/components/form/form-section";
import { Button } from "@/components/ui/button";
import { useUrlSearch } from "@/hooks/use-url-search";
import { cn } from "@/lib/utils/cn";
import { formatDateTime } from "@/lib/utils/date";
import { overlay } from "@/stores/overlay-store";
import { useSearchJobsQuery } from "../batch-job.queries";
import { DEFAULT_SEARCH, parseSearch, serializeSearch } from "../batch-job.search";
import type { BatchJob } from "../batch-job.type";
import { BatchJobFormPopup } from "../popup/batch-job-form-popup";
import { BatchJobSearchForm } from "./batch-job-search-form";

/** 배치 목록 */
export function BatchJobList() {

  const router = useRouter();
  const pathname = usePathname();

  const { search, go, move, paramsKey } = useUrlSearch({ parse: parseSearch, serialize: serializeSearch });
  const { data, refetch } = useSearchJobsQuery(search);

  // 등록 팝업
  const openNewForm = () => {
    overlay.open("배치 등록", <BatchJobFormPopup />, { size: "lg" });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 검색조건 */}
      <BatchJobSearchForm
        key={paramsKey}
        search={search}
        onSearchAction={(condition) => move({ ...condition, page: 1 }, refetch)}
        onResetAction={() => go(DEFAULT_SEARCH, refetch)}
      />

      {/* 조회결과 */}
      <FormSection
        title="배치 조회결과"
        actions={<Button variant="primary" onClick={openNewForm}>신규 등록</Button>}
      >
        <DataTable
          columns={COLUMNS}
          rows={data?.content}
          rowKey={(row) => row.jobId}
          rowClassName={(row) => !row.enabled && "text-fg-muted"}
          onRowDoubleClick={(row) => router.push(`${pathname}/${row.jobId}${serializeSearch(search)}`)}
        />
        <Pagination
          page={search.page}
          totalPages={data?.totalPages ?? 0}
          totalElements={data?.totalElements ?? 0}
          size={search.size}
          onPageChange={(page) => move({ page })}
          onSizeChange={(size) => move({ size, page: 1 })}
        />
      </FormSection>
    </div>
  );
}

// 목록 컬럼
const COLUMNS: DataTableColumn<BatchJob>[] = [
  { key: "jobId", header: "배치 ID", className: "w-56" },
  { key: "jobName", header: "배치명" },
  { key: "cronExpression", header: "실행 주기", className: "w-32 text-center" },
  { key: "enabled", header: "사용 여부", className: "w-20 text-center",
    render: (row) => row.enabled ? "사용" : "미사용",
  },
  { key: "lastStatusName", header: "최근 상태", className: "w-20 text-center",
    render: (row) => <span className={cn(row.lastStatus === "FAILED" && "text-danger")}>{row.lastStatusName}</span>,
  },
  { key: "lastStartedAt", header: "최근 시작", className: "w-36 text-center", render: (row) => formatDateTime(row.lastStartedAt) },
  { key: "lastEndedAt", header: "최근 종료", className: "w-36 text-center", render: (row) => formatDateTime(row.lastEndedAt) },
];
