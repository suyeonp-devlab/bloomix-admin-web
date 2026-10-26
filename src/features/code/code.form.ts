import type { CommonCodeGroupRequest, CommonCodeResponse } from "./code.type";

// 코드 그룹 등록 폼 초기값
export const CODE_GROUP_EMPTY_FORM_VALUES: CommonCodeGroupRequest = {
  groupCode: "",
  groupName: "",
  description: "",
  enabled: true,
  codes: [],
};

// 코드 등록 폼 초기값
export const CODE_EMPTY_FORM_VALUES: CommonCodeResponse = {
  code: "",
  codeName: "",
  sortOrder: 0,
  enabled: true,
  etc1: null,
  etc2: null,
  etc3: null,
};

// 등록 폼 값 normalize
export function normalizeFormValues(values: CommonCodeGroupRequest): CommonCodeGroupRequest {

  // 앞뒤 공백 제거: 그룹명, 설명, 코드명
  // 빈문자열 null 처리: 설명, 기타1, 기타2, 기타3
  return {
    ...values,
    groupName: values.groupName.trim(),
    description: values.description?.trim() || null,
    codes: values.codes.map((item) => ({
      ...item,
      codeName: item.codeName.trim(),
      etc1: item.etc1 || null,
      etc2: item.etc2 || null,
      etc3: item.etc3 || null,
    })),
  };
}
