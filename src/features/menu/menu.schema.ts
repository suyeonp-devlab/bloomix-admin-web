import { z } from "zod";

const UPPER_UNDERSCORE = /^[A-Z_]+$/;

// 메뉴 폼 검증
export const menuSchema = z.object({
  menuId: z.string()
    .min(1, "메뉴 ID를 입력해주세요.")
    .max(50, "50자 이하로 입력해주세요.")
    .regex(UPPER_UNDERSCORE, "영문 대문자와 _만 사용할 수 있습니다."),
  parentId: z.string().nullable(),
  menuName: z.string().trim()
    .min(1, "메뉴명을 입력해주세요.")
    .max(50, "50자 이하로 입력해주세요."),
  menuPath: z.string().trim()
    .max(200, "200자 이하로 입력해주세요.")
    .refine((value) => !value || value.startsWith("/"), "/로 시작해야 합니다.")
    .nullable(),
  sortOrder: z
    .number({ error: "정렬 순서를 입력해주세요." })
    .int("정렬 순서는 정수로 입력해주세요."),
  enabled: z.boolean({ error: "사용 여부를 선택해주세요." }),
})
.superRefine((value, ctx) => {

  // 하위 메뉴는 메뉴 경로 필수
  if (value.parentId && !value.menuPath) {
    ctx.addIssue({ code: "custom", message: "하위 메뉴는 메뉴 경로를 입력해주세요.", path: ["menuPath"] });
  }
});
