import type { Metadata } from "next";
import { Suspense } from "react";
import { MenuPageHeader } from "@/features/menu/components/menu-page-header";
import { UserList } from "@/features/user/components/user-list";

export const metadata: Metadata = { title: "회원 목록" };

/** 회원 목록 페이지 */
export default function UserPage() {

  return (
    <div className="flex flex-col gap-4">
      <MenuPageHeader />
      <Suspense>
        <UserList />
      </Suspense>
    </div>
  );
}
