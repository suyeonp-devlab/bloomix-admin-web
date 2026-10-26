import { z } from "zod";

const UPPER_UNDERSCORE = /^[A-Z_]+$/;

// 코드 행 검증
const codeSchema = z.object({
  code: z.string()
    .min(1, "코드를 입력해주세요.")
    .max(50, "코드는 50자 이하로 입력해주세요.")
    .regex(UPPER_UNDERSCORE, "코드는 영문 대문자와 _만 사용할 수 있습니다."),
  codeName: z.string().trim()
    .min(1, "코드명을 입력해주세요.")
    .max(100, "코드명은 100자 이하로 입력해주세요."),
  sortOrder: z
    .number({ error: "정렬 순서를 입력해주세요." })
    .int("정렬 순서는 정수로 입력해주세요."),
  enabled: z.boolean({ error: "사용 여부를 선택해주세요." }),
  etc1: z.string().max(50, "기타1은 50자 이하로 입력해주세요.").nullable(),
  etc2: z.string().max(50, "기타2는 50자 이하로 입력해주세요.").nullable(),
  etc3: z.string().max(50, "기타3은 50자 이하로 입력해주세요.").nullable(),
});

// 코드 그룹 폼 검증
export const codeGroupSchema = z.object({
  groupCode: z.string()
    .min(1, "그룹코드를 입력해주세요.")
    .max(50, "50자 이하로 입력해주세요.")
    .regex(UPPER_UNDERSCORE, "영문 대문자와 _만 사용할 수 있습니다."),
  groupName: z.string().trim()
    .min(1, "그룹명을 입력해주세요.")
    .max(100, "100자 이하로 입력해주세요."),
  description: z.string().max(255, "255자 이하로 입력해주세요.").nullable(),
  enabled: z.boolean({ error: "사용 여부를 선택해주세요." }),
  codes: z.array(codeSchema),
})
.superRefine((value, ctx) => {

    // 코드 중복 검사
    const seen = new Set<string>();

    value.codes.forEach((item, index) => {
      if (seen.has(item.code)) {
        ctx.addIssue({ code: "custom", message: "중복된 코드가 있습니다.", path: ["codes", index, "code"] });
      }
      seen.add(item.code);
    });
});
