import type { Metadata } from "next";
import { Suspense } from "react";
import { MenuList } from "@/features/menu/components/menu-list";
import { MenuPageHeader } from "@/features/menu/components/menu-page-header";

export const metadata: Metadata = { title: "메뉴 관리" };

/** 메뉴 관리 페이지 */
export default function MenuPage() {

  return (
    <div className="flex flex-col gap-4">
      <MenuPageHeader />
      <Suspense>
        <MenuList />
      </Suspense>
    </div>
  );
}
