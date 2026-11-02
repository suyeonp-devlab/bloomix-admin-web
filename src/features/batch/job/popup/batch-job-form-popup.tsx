"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormCell } from "@/components/form/form-cell";
import { FormRow } from "@/components/form/form-row";
import { FormTable } from "@/components/form/form-table";
import { PopupBody, PopupFooter } from "@/components/overlay/popup";
import { Button } from "@/components/ui/button";
import { EnabledSelect } from "@/components/ui/enabled-select";
import { Input } from "@/components/ui/input";
import { useCodeOptionsQuery } from "@/lib/code-option/code-option.queries";
import type { CodeOption } from "@/lib/code-option/code-option.type";
import { overlay } from "@/stores/overlay-store";
import { BATCH_JOB_EMPTY_FORM_VALUES, normalizeFormValues } from "../batch-job.form";
import { useCreateJobMutation, useUpdateJobMutation } from "../batch-job.queries";
import { batchJobSchema } from "../batch-job.schema";
import type { BatchJob, BatchJobFormRequest } from "../batch-job.type";

type BatchJobFormPopupProps = {
  job?: BatchJob;
};

type BatchJobFormPopupBodyProps = BatchJobFormPopupProps & {
  usgTypes: CodeOption[];
};

/** 배치 등록 및 수정 popup */
export function BatchJobFormPopup({ job }: BatchJobFormPopupProps) {

  const { data: usgTypes, isPending } = useCodeOptionsQuery("USG_STATUS");

  if (isPending) return null;

  return <BatchJobFormPopupBody job={job} usgTypes={usgTypes ?? []} />;
}

/** 배치 등록 및 수정 popup 본문 */
function BatchJobFormPopupBody({ job, usgTypes }: BatchJobFormPopupBodyProps) {

  const { mutateAsync: createJob, isPending: creating } = useCreateJobMutation();
  const { mutateAsync: updateJob, isPending: updating } = useUpdateJobMutation();

  const { register, control, handleSubmit, formState: { errors } } = useForm<BatchJobFormRequest>({
    resolver: zodResolver(batchJobSchema),
    defaultValues: job ?? BATCH_JOB_EMPTY_FORM_VALUES,
  });

  // 배치 저장 및 수정
  const handleSave = async (values: BatchJobFormRequest) => {

    const body = normalizeFormValues(values);

    if (job) await updateJob({ jobId: job.jobId, body });
    else await createJob(body);

    await overlay.alert("저장되었습니다.");
    overlay.close();
  };

  return (
    <form onSubmit={handleSubmit(handleSave)} noValidate className="contents">
      <PopupBody>
        <div className="overflow-hidden rounded-md border border-line">
          <FormTable>
            <FormRow>
              <FormCell label="배치 ID" htmlFor="jobId" required error={errors.jobId?.message}>
                <Input
                  id="jobId"
                  readOnly={!!job}
                  invalid={!!errors.jobId}
                  placeholder="서버에 정의된 Job 이름"
                  {...register("jobId")}
                />
              </FormCell>
              <FormCell label="배치명" htmlFor="jobName" required error={errors.jobName?.message}>
                <Input id="jobName" invalid={!!errors.jobName} {...register("jobName")} />
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell label="실행 주기" htmlFor="cronExpression" error={errors.cronExpression?.message}>
                <Input
                  id="cronExpression"
                  invalid={!!errors.cronExpression}
                  placeholder="cron 표현식"
                  {...register("cronExpression")}
                />
              </FormCell>
              <FormCell label="사용 여부" htmlFor="enabled" required error={errors.enabled?.message}>
                <EnabledSelect
                  control={control}
                  name="enabled"
                  options={usgTypes}
                  id="enabled"
                  className="w-32"
                  invalid={!!errors.enabled}
                />
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell label="설명" htmlFor="description" span={3} error={errors.description?.message}>
                <Input id="description" invalid={!!errors.description} {...register("description")} />
              </FormCell>
            </FormRow>
          </FormTable>
        </div>
      </PopupBody>
      <PopupFooter>
        <Button onClick={() => overlay.close()}>취소</Button>
        <Button type="submit" variant="primary-solid" disabled={creating || updating}>저장</Button>
      </PopupFooter>
    </form>
  );
}
