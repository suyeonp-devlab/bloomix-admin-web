import type { BatchHistoryListRequest } from "./batch-history.type";

export const batchHistoryKeys = {
  all: ["batch-history"] as const,
  lists: () => [...batchHistoryKeys.all, "list"] as const,
  list: (params: BatchHistoryListRequest) => [...batchHistoryKeys.lists(), params] as const,
  recent: (jobId: string) => [...batchHistoryKeys.all, "recent", jobId] as const,
};
