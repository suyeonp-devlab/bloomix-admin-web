import type { Metadata } from "next";
import { Suspense } from "react";
import { CodeGroupDetail } from "@/features/code/components/code-group-detail";
import { MenuPageHeader } from "@/features/menu/components/menu-page-header";

export const metadata: Metadata = { title: "공통코드 상세" };

/** 공통코드 상세 페이지 */
export default async function CodeGroupDetailPage({ params }: PageProps<"/admin/codes/[groupCode]">) {

  const { groupCode } = await params;

  return (
    <div className="flex flex-col gap-4">
      <MenuPageHeader title="공통코드 상세" current="상세" />
      <Suspense>
        <CodeGroupDetail groupCode={groupCode} />
      </Suspense>
    </div>
  );
}
