import type { BatchJobFormRequest } from "./batch-job.type";

// 배치 등록 폼 초기값
export const BATCH_JOB_EMPTY_FORM_VALUES: BatchJobFormRequest = {
  jobId: "",
  jobName: "",
  description: "",
  cronExpression: "",
  enabled: true,
};

// 등록 폼 값 normalize
export function normalizeFormValues(values: BatchJobFormRequest): BatchJobFormRequest {

  // 앞뒤 공백 제거: 배치명, 설명, 실행 주기
  // 빈문자열 null 처리: 설명, 실행 주기
  return {
    ...values,
    jobName: values.jobName.trim(),
    description: values.description?.trim() || null,
    cronExpression: values.cronExpression?.trim() || null,
  };
}
