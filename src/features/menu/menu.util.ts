import type { AdminMenu } from "./menu.type";

// 현재 경로와 일치하는 메뉴 경로인지 확인 (하위 경로 포함)
export function isActivePath(menuPath: string | null, currentPath: string) {
  return menuPath !== null && (menuPath === currentPath || currentPath.startsWith(`${menuPath}/`));
}

// 현재 경로에 해당하는 breadcrumb
export function findMenuBreadcrumb(menus: AdminMenu[], pathname: string) {

  for (const menu of menus) {
    const child = menu.children.find((c) => isActivePath(c.menuPath, pathname));
    if (child) return [menu, child];
    if (isActivePath(menu.menuPath, pathname)) return [menu];
  }

  return [];
}

// 메뉴 ID로 메뉴 찾기
export function findMenu(menus: AdminMenu[], menuId: string | null) {

  if (!menuId) return undefined;

  for (const menu of menus) {
    if (menu.menuId === menuId) return menu;
    const child = menu.children.find((c) => c.menuId === menuId);
    if (child) return child;
  }

  return undefined;
}
