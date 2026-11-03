"use client";

import type { DataTableColumn } from "@/components/data/data-table";
import { DataTable } from "@/components/data/data-table";
import { Pagination } from "@/components/data/pagination";
import { FormSection } from "@/components/form/form-section";
import { useUrlSearch } from "@/hooks/use-url-search";
import { formatDateTime } from "@/lib/utils/date";
import { overlay } from "@/stores/overlay-store";
import { useSearchHistoriesQuery } from "../batch-history.queries";
import { DEFAULT_SEARCH, parseSearch, serializeSearch } from "../batch-history.search";
import type { BatchHistory } from "../batch-history.type";
import { BatchHistoryDetailPopup } from "../popup/batch-history-detail-popup";
import { BatchHistorySearchForm } from "./batch-history-search-form";
import { cn } from "@/lib/utils/cn";

/** 배치 실행 이력 목록 */
export function BatchHistoryList() {

  const { search, go, move, paramsKey } = useUrlSearch({ parse: parseSearch, serialize: serializeSearch });
  const { data, refetch } = useSearchHistoriesQuery(search);

  // 상세 팝업
  const openDetail = (history: BatchHistory) => {
    overlay.open(
      "실행 이력 상세",
      <BatchHistoryDetailPopup history={history} />,
      { size: "lg" }
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 검색조건 */}
      <BatchHistorySearchForm
        key={paramsKey}
        search={search}
        onSearchAction={(condition) => move({ ...condition, page: 1 }, refetch)}
        onResetAction={() => go(DEFAULT_SEARCH, refetch)}
      />

      {/* 조회결과 */}
      <FormSection title="실행 이력 조회결과">
        <DataTable
          columns={COLUMNS}
          rows={data?.content}
          rowKey={(row) => String(row.historyId)}
          onRowDoubleClick={openDetail}
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
const COLUMNS: DataTableColumn<BatchHistory>[] = [
  { key: "jobId", header: "배치 ID", className: "w-48" },
  { key: "jobName", header: "배치명", className: "w-50" },
  { key: "statusName", header: "상태", className: "w-20 text-center",
    render: (row) => <span className={cn(row.status === "FAILED" && "text-danger")}>{row.statusName}</span>
  },
  { key: "triggerTypeName", header: "실행 구분", className: "w-24 text-center" },
  { key: "startedAt", header: "시작일시", className: "w-36 text-center", render: (row) => formatDateTime(row.startedAt) },
  { key: "endedAt", header: "종료일시", className: "w-36 text-center", render: (row) => formatDateTime(row.endedAt) },
  { key: "executedBy", header: "실행자", className: "w-24 text-center" },
  { key: "message", header: "메시지" },
];
