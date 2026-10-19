"use client";

import { usePathname } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { useSidebarMenusQuery } from "../menu.queries";
import { findMenuBreadcrumb } from "../menu.util";

type MenuPageHeaderProps = {
  title?: string;     // 제목 (default 현재 메뉴명)
  current?: string;   // 메뉴 아래 단계의 현재 화면 이름
};

/** 메뉴 본문 상단 */
export function MenuPageHeader({ title, current }: MenuPageHeaderProps) {

  const pathname = usePathname();
  const { data: menus = [] } = useSidebarMenusQuery();

  const menuNames = findMenuBreadcrumb(menus, pathname).map((menu) => menu.menuName);
  const breadcrumb = current ? [...menuNames, current] : menuNames;

  return <PageHeader title={title ?? menuNames.at(-1) ?? ""} breadcrumb={breadcrumb} />;
}
