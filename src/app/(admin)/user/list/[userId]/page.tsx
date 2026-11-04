import type { Metadata } from "next";
import { Suspense } from "react";
import { MenuPageHeader } from "@/features/menu/components/menu-page-header";
import { UserDetail } from "@/features/user/components/user-detail";

export const metadata: Metadata = { title: "회원 상세" };

/** 회원 상세 페이지 */
export default async function UserDetailPage({ params }: PageProps<"/user/list/[userId]">) {

  const { userId } = await params;

  return (
    <div className="flex flex-col gap-4">
      <MenuPageHeader title="회원 상세" current="상세" />
      <Suspense>
        <UserDetail userId={userId} />
      </Suspense>
    </div>
  );
}
