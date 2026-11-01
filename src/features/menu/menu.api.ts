import { get, post, put } from "@/lib/api/client";
import type { AdminMenu, AdminMenuFormRequest } from "./menu.type";

const BASE = "/api/admin-menus";

// 사이드바 메뉴 조회
export function getSidebarMenus() {
  return get<AdminMenu[]>(`${BASE}/sidebar`);
}

// 전체 메뉴 조회
export function getMenus() {
  return get<AdminMenu[]>(BASE);
}

// 메뉴 등록
export function createMenu(body: AdminMenuFormRequest) {
  return post(BASE, body);
}

// 메뉴 수정
export function updateMenu(menuId: string, body: AdminMenuFormRequest) {
  return put(`${BASE}/${encodeURIComponent(menuId)}`, body);
}
