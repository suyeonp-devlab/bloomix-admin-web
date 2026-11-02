import type { BatchJobListRequest } from "./batch-job.type";

export const batchJobKeys = {
  all: ["batch-job"] as const,
  lists: () => [...batchJobKeys.all, "list"] as const,
  list: (params: BatchJobListRequest) => [...batchJobKeys.lists(), params] as const,
  detail: (jobId: string) => [...batchJobKeys.all, "detail", jobId] as const,
};
