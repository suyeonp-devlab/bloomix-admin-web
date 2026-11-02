"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { BatchHistoryRecentSection } from "@/features/batch/history/components/batch-history-recent-section";
import { useGetJobQuery } from "../batch-job.queries";
import { toListHref } from "../batch-job.search";
import { BatchJobInfoSection } from "./batch-job-info-section";
import { BatchJobRunSection } from "./batch-job-run-section";

type BatchJobDetailProps = {
  jobId: string;
};

/** 배치 상세 */
export function BatchJobDetail({ jobId }: BatchJobDetailProps) {

  const router = useRouter();
  const listHref = toListHref(useSearchParams());
  const { data, isError } = useGetJobQuery(jobId);

  useEffect(() => {
    if (isError) router.replace(listHref);
  }, [isError, listHref, router]);

  if (!data) return null;

  return (
    <div className="flex flex-col gap-4">
      <BatchJobInfoSection job={data} listHref={listHref} />
      <BatchJobRunSection job={data} listHref={listHref} />
      <BatchHistoryRecentSection jobId={data.jobId} />
    </div>
  );
}
