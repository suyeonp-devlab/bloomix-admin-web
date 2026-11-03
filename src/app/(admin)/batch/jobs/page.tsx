import type { Metadata } from "next";
import { Suspense } from "react";
import { BatchJobList } from "@/features/batch/job/components/batch-job-list";
import { MenuPageHeader } from "@/features/menu/components/menu-page-header";

export const metadata: Metadata = { title: "배치 목록" };

/** 배치 목록 페이지 */
export default function BatchJobPage() {

  return (
    <div className="flex flex-col gap-4">
      <MenuPageHeader />
      <Suspense>
        <BatchJobList />
      </Suspense>
    </div>
  );
}
