import type { Metadata } from "next";
import { Suspense } from "react";
import { BatchJobDetail } from "@/features/batch/job/components/batch-job-detail";
import { MenuPageHeader } from "@/features/menu/components/menu-page-header";

export const metadata: Metadata = { title: "배치 상세" };

/** 배치 상세 페이지 */
export default async function BatchJobDetailPage({ params }: PageProps<"/batch/jobs/[jobId]">) {

  const { jobId } = await params;

  return (
    <div className="flex flex-col gap-4">
      <MenuPageHeader title="배치 상세" current="상세" />
      <Suspense>
        <BatchJobDetail jobId={jobId} />
      </Suspense>
    </div>
  );
}
