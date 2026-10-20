import type { Metadata } from "next";
import { Suspense } from "react";
import { CodeGroupList } from "@/features/code/components/code-group-list";
import { MenuPageHeader } from "@/features/menu/components/menu-page-header";

export const metadata: Metadata = { title: "공통코드 관리" };

/** 공통코드 관리 페이지 */
export default function CodeGroupPage() {

  return (
    <div className="flex flex-col gap-4">
      <MenuPageHeader />
      <Suspense>
        <CodeGroupList />
      </Suspense>
    </div>
  );
}
