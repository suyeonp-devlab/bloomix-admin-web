import { z } from "zod";

// 배치 폼 검증
export const batchJobSchema = z.object({
  jobId: z.string()
    .min(1, "배치 ID를 입력해주세요.")
    .max(50, "50자 이하로 입력해주세요.")
    .regex(/^[A-Z0-9_]+$/, "영문 대문자, 숫자, _만 사용할 수 있습니다."),
  jobName: z.string().trim()
    .min(1, "배치명을 입력해주세요.")
    .max(100, "100자 이하로 입력해주세요."),
  description: z.string().trim()
    .max(255, "255자 이하로 입력해주세요.")
    .nullable(),
  cronExpression: z.string().trim()
    .max(50, "50자 이하로 입력해주세요.")
    .nullable(),
  enabled: z.boolean({ error: "사용 여부를 선택해주세요." }),
});

// 배치 즉시 실행 폼 검증
export const batchJobRunSchema = z.object({
  parameters: z.string().trim()
    .refine((value) => {

      // 비어 있으면 파라미터 없이 실행
      if (!value) return true;

      // 값이 문자열인 JSON 객체
      try {
        return z.record(z.string(), z.string()).safeParse(JSON.parse(value)).success;
      } catch {
        return false;
      }
    }, "{\"key\": \"value\"} 형식의 JSON으로 입력해주세요."),
});
