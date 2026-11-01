"use client";

import { FormCell } from "@/components/form/form-cell";
import { FormRow } from "@/components/form/form-row";
import { FormTable } from "@/components/form/form-table";
import { FormValue } from "@/components/form/form-value";
import { PopupBody, PopupFooter } from "@/components/overlay/popup";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils/date";
import { overlay } from "@/stores/overlay-store";
import { useRestartHistoryMutation } from "../batch-history.queries";
import type { BatchHistory } from "../batch-history.type";
import { cn } from "@/lib/utils/cn";

type BatchHistoryDetailPopupProps = {
  history: BatchHistory;
};

/** 배치 실행 이력 상세 popup */
export function BatchHistoryDetailPopup({ history }: BatchHistoryDetailPopupProps) {

  const { mutateAsync: restartHistory, isPending } = useRestartHistoryMutation();

  // 파라미터 표시
  const parameters = history.parameters && Object.keys(history.parameters).length > 0
    ? JSON.stringify(history.parameters) : "";

  // 배치 재시작
  const handleRestart = async () => {

    const confirmed = await overlay.confirm(`${history.jobName} 배치를\n실패 지점부터 재시작하시겠습니까?`, { confirmText: "재시작" });
    if (!confirmed) return;

    await restartHistory(history.historyId);
    await overlay.alert("배치 재시작을 요청했습니다.");
    overlay.close();
  };

  return (
    <>
      <PopupBody>
        <div className="overflow-hidden rounded-md border border-line">
          <FormTable>
            <FormRow>
              <FormCell label="배치 ID">
                <FormValue value={history.jobId} />
              </FormCell>
              <FormCell label="배치명">
                <FormValue value={history.jobName} />
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell label="상태">
                <FormValue value={<span className={cn(history.status === "FAILED" && "text-danger")}>{history.statusName}</span>} />
              </FormCell>
              <FormCell label="실행 구분">
                <FormValue value={history.triggerTypeName} />
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell label="시작일시">
                <FormValue value={formatDateTime(history.startedAt)} />
              </FormCell>
              <FormCell label="종료일시">
                <FormValue value={formatDateTime(history.endedAt)} />
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell label="실행자" span={3}>
                <FormValue value={history.executedBy} />
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell label="파라미터" span={3}>
                <FormValue value={parameters} />
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell label="메시지" span={3}>
                <FormValue value={history.message} />
              </FormCell>
            </FormRow>
          </FormTable>
        </div>
      </PopupBody>
      <PopupFooter>
        <Button onClick={() => overlay.close()}>닫기</Button>
        {history.status === "FAILED" && (
          <Button variant="primary-solid" disabled={isPending} onClick={handleRestart}>재시작</Button>
        )}
      </PopupFooter>
    </>
  );
}
