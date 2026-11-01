import type { Metadata } from "next";
import { Suspense } from "react";
import { BatchHistoryList } from "@/features/batch/history/components/batch-history-list";
import { MenuPageHeader } from "@/features/menu/components/menu-page-header";

export const metadata: Metadata = { title: "실행 이력" };

/** 배치 실행 이력 페이지 */
export default function BatchHistoryPage() {

  return (
    <div className="flex flex-col gap-4">
      <MenuPageHeader />
      <Suspense>
        <BatchHistoryList />
      </Suspense>
    </div>
  );
}
