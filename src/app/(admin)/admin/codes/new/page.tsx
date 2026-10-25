import type { Metadata } from "next";
import { Suspense } from "react";
import { CodeGroupForm } from "@/features/code/components/code-group-form";
import { MenuPageHeader } from "@/features/menu/components/menu-page-header";

export const metadata: Metadata = { title: "공통코드 신규 등록" };

/** 공통코드 신규 등록 페이지 */
export default function CodeGroupNewPage() {

  return (
    <div className="flex flex-col gap-4">
      <MenuPageHeader title="공통코드 신규 등록" current="신규 등록" />
      <Suspense>
        <CodeGroupForm />
      </Suspense>
    </div>
  );
}
