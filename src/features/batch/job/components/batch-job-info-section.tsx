"use client";

import { useRouter } from "next/navigation";
import { FormCell } from "@/components/form/form-cell";
import { FormRow } from "@/components/form/form-row";
import { FormSection } from "@/components/form/form-section";
import { FormTable } from "@/components/form/form-table";
import { FormValue } from "@/components/form/form-value";
import { Button } from "@/components/ui/button";
import { overlay } from "@/stores/overlay-store";
import type { BatchJob } from "../batch-job.type";
import { BatchJobFormPopup } from "../popup/batch-job-form-popup";

type BatchJobInfoSectionProps = {
  job: BatchJob;
  listHref: string;
};

/** 배치 상세 > 배치 정보 */
export function BatchJobInfoSection({ job, listHref }: BatchJobInfoSectionProps) {

  const router = useRouter();

  // 수정 팝업
  const openEditForm = () => {
    overlay.open("배치 수정", <BatchJobFormPopup job={job} />, { size: "lg" });
  };

  return (
    <FormSection
      title="배치 정보"
      actions={
        <div className="flex gap-2">
          <Button onClick={() => router.push(listHref)}>목록</Button>
          <Button onClick={openEditForm}>수정</Button>
        </div>
      }
    >
      <FormTable>
        <FormRow>
          <FormCell label="배치 ID">
            <FormValue value={job.jobId} />
          </FormCell>
          <FormCell label="배치명">
            <FormValue value={job.jobName} />
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell label="실행 주기">
            <FormValue value={job.cronExpression} />
          </FormCell>
          <FormCell label="사용 여부">
            <FormValue value={job.enabled ? "사용" : "미사용"} />
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell label="설명" span={3}>
            <FormValue value={job.description} />
          </FormCell>
        </FormRow>
      </FormTable>
    </FormSection>
  );
}
