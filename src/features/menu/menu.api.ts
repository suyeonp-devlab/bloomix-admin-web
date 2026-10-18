import { get } from "@/lib/api/client";
import type { AdminMenu } from "./menu.type";

const BASE = "/api/admin-menus";

// 사이드바 메뉴 조회
export function getSidebarMenus() {
  return get<AdminMenu[]>(`${BASE}/sidebar`);
}
