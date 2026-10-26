import type { AdminMenu, AdminMenuRequest } from "./menu.type";

// 메뉴 등록 폼 초기값
export const MENU_EMPTY_FORM_VALUES: AdminMenuRequest = {
  menuId: "",
  parentId: "",
  menuName: "",
  menuPath: "",
  sortOrder: 0,
  enabled: true,
};

// 다음 정렬 순서 (같은 단계 메뉴의 최댓값 + 1)
export function nextSortOrder(menus: AdminMenu[]) {
  return Math.max(0, ...menus.map((item) => item.sortOrder)) + 1;
}

// 등록 폼 값 normalize
export function normalizeFormValues(values: AdminMenuRequest): AdminMenuRequest {

  // 앞뒤 공백 제거: 메뉴명, 메뉴 경로
  // 빈문자열 null 처리: 상위 메뉴, 메뉴 경로
  return {
    ...values,
    parentId: values.parentId || null,
    menuName: values.menuName.trim(),
    menuPath: values.menuPath?.trim() || null,
  };
}
