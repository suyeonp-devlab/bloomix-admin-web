"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/data/data-table";
import type { DataTableColumn } from "@/components/data/data-table";
import { FormSection } from "@/components/form/form-section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { formatDateTime } from "@/lib/utils/date";
import { overlay } from "@/stores/overlay-store";
import { useRecentHistoriesQuery } from "../batch-history.queries";
import { toBatchHistoryHref } from "../batch-history.search";
import type { BatchHistory } from "../batch-history.type";
import { BatchHistoryDetailPopup } from "../popup/batch-history-detail-popup";

type BatchHistoryRecentSectionProps = {
  jobId: string;
};

/** 배치 최근 실행 이력 */
export function BatchHistoryRecentSection({ jobId }: BatchHistoryRecentSectionProps) {

  const router = useRouter();
  const { data } = useRecentHistoriesQuery(jobId);

  // 상세 팝업
  const openDetail = (history: BatchHistory) => {
    overlay.open(
      "실행 이력 상세",
      <BatchHistoryDetailPopup history={history} />,
      { size: "lg" }
    );
  };

  return (
    <FormSection
      title="최근 실행 이력"
      subtitle="최근 10건까지 표시하며, 전체 이력은 더보기에서 확인할 수 있습니다."
      actions={<Button onClick={() => router.push(toBatchHistoryHref(jobId))}>더보기</Button>}
    >
      <DataTable
        columns={COLUMNS}
        rows={data?.content}
        rowKey={(row) => String(row.historyId)}
        maxRows={8}
        onRowDoubleClick={openDetail}
        emptyText="실행 이력이 없습니다."
      />
    </FormSection>
  );
}

// 이력 컬럼
const COLUMNS: DataTableColumn<BatchHistory>[] = [
  { key: "statusName", header: "상태", className: "w-20 text-center",
    render: (row) => <span className={cn(row.status === "FAILED" && "text-danger")}>{row.statusName}</span>,
  },
  { key: "triggerTypeName", header: "실행 구분", className: "w-24 text-center" },
  { key: "startedAt", header: "시작일시", className: "w-36 text-center", render: (row) => formatDateTime(row.startedAt) },
  { key: "endedAt", header: "종료일시", className: "w-36 text-center", render: (row) => formatDateTime(row.endedAt) },
  { key: "executedBy", header: "실행자", className: "w-24 text-center" },
  { key: "message", header: "메시지" },
];
