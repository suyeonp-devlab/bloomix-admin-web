"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FormCell } from "@/components/form/form-cell";
import { FormRow } from "@/components/form/form-row";
import { FormSection } from "@/components/form/form-section";
import { FormTable } from "@/components/form/form-table";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { overlay } from "@/stores/overlay-store";
import { useRunJobMutation } from "../batch-job.queries";
import { batchJobRunSchema } from "../batch-job.schema";
import type { BatchJob } from "../batch-job.type";

type BatchJobRunSectionProps = {
  job: BatchJob;
  listHref: string;
};

// 즉시 실행 폼 값 (실행 파라미터)
type RunFormValues = {
  parameters: string;
};

/** 배치 상세 > 배치 즉시 실행 */
export function BatchJobRunSection({ job, listHref }: BatchJobRunSectionProps) {

  const router = useRouter();

  const { mutateAsync: runJob, isPending } = useRunJobMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<RunFormValues>({
    resolver: zodResolver(batchJobRunSchema),
    defaultValues: { parameters: "" },
  });

  // 즉시 실행
  const handleRun = async ({ parameters }: RunFormValues) => {

    const confirmed = await overlay.confirm(`${job.jobName} 배치를\n즉시 실행하시겠습니까?`, { confirmText: "실행" });
    if (!confirmed) return;

    // 비어 있으면 파라미터 없이 실행
    await runJob({ jobId: job.jobId, body: { parameters: parameters ? JSON.parse(parameters) : undefined } });
    await overlay.alert("배치 실행을 요청했습니다.");
    router.push(listHref);
  };

  return (
    <form onSubmit={handleSubmit(handleRun)} noValidate>
      <FormSection
        title="즉시 실행"
        actions={<Button type="submit" variant="primary" disabled={isPending || job.lastStatus === "RUNNING"}>즉시 실행</Button>}
      >
        <FormTable>
          <FormRow>
            <FormCell label="실행 파라미터" htmlFor="parameters" error={errors.parameters?.message}>
              <Textarea
                id="parameters"
                rows={3}
                invalid={!!errors.parameters}
                placeholder="JSON 형식으로 입력 (선택)"
                {...register("parameters")}
              />
            </FormCell>
          </FormRow>
        </FormTable>
      </FormSection>
    </form>
  );
}
