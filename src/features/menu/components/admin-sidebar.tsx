"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { useSidebarMenusQuery } from "../menu.queries";

/** 어드민 사이드바 */
export function AdminSidebar() {

  const pathname = usePathname();
  const { data: menus = [] } = useSidebarMenusQuery();
  const [toggled, setToggled] = useState<Record<string, boolean>>({});

  return (
    <nav aria-label="메뉴">
      {menus.map((menu) => {

        // 하위 메뉴가 없으면 단독 링크
        if (menu.children.length === 0) {
          return menu.menuPath && (
            <Link
              key={menu.menuId}
              href={menu.menuPath}
              aria-current={isActivePath(menu.menuPath, pathname) ? "page" : undefined}
              className={cn(ROW_CLASS, "border-b border-line font-medium", isActivePath(menu.menuPath, pathname) ? ACTIVE_CLASS : "hover:bg-subtle")}
            >
              {menu.menuName}
            </Link>
          );
        }

        const hasActive = menu.children.some((child) => isActivePath(child.menuPath, pathname));
        const open = toggled[menu.menuId] ?? hasActive;

        return (
          <div key={menu.menuId} className="border-b border-line">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setToggled((prev) => ({ ...prev, [menu.menuId]: !open }))}
              className={cn(ROW_CLASS, "w-full justify-between font-medium hover:bg-subtle")}
            >
              {menu.menuName}
              <ChevronDown
                className={cn("size-4 text-fg-muted transition-transform", open && "rotate-180")}
                aria-hidden
              />
            </button>
            {open && menu.children.map((child) => child.menuPath && (
              <Link
                key={child.menuId}
                href={child.menuPath}
                aria-current={isActivePath(child.menuPath, pathname) ? "page" : undefined}
                className={cn(
                  "flex h-8 items-center pr-4 pl-8 text-base",
                  isActivePath(child.menuPath, pathname) ? ACTIVE_CLASS : "text-fg-secondary hover:bg-subtle",
                )}
              >
                {child.menuName}
              </Link>
            ))}
          </div>
        );
      })}
    </nav>
  );
}

// 현재 경로와 일치하는 메뉴인지 확인
function isActivePath(menuPath: string | null, currentPath: string) {
  return menuPath !== null && (menuPath === currentPath || currentPath.startsWith(`${menuPath}/`));
}

// 메뉴 행 공통 className
const ROW_CLASS = "flex h-9 items-center px-4 text-base";

// 선택된 메뉴 className
const ACTIVE_CLASS = "bg-primary-50 font-medium text-primary-700";
