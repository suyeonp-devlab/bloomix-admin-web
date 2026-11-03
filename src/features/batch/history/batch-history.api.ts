import type { PageResponse } from "@/lib/api/api.type";
import { get, post } from "@/lib/api/client";
import type { BatchHistory, BatchHistoryListRequest } from "./batch-history.type";

const BASE = "/api/batch-job-histories";

// 배치 실행 이력 목록 조회
export function searchHistories(params: BatchHistoryListRequest) {
  return get<PageResponse<BatchHistory>>(BASE, { params });
}

// 배치 재시작
export function restartHistory(historyId: number) {
  return post(`${BASE}/${historyId}/restart`);
}
