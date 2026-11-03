import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { batchJobKeys } from "../job/batch-job.keys";
import { restartHistory, searchHistories } from "./batch-history.api";
import { batchHistoryKeys } from "./batch-history.keys";
import { DEFAULT_SEARCH, HISTORY_SEARCH_TYPE_ID } from "./batch-history.search";
import type { BatchHistoryListRequest } from "./batch-history.type";

// 최근 실행 이력 건수
const RECENT_SIZE = 10;

/** 배치 실행 이력 목록 조회 query */
export function useSearchHistoriesQuery(params: BatchHistoryListRequest) {

  return useQuery({
    queryKey: batchHistoryKeys.list(params),
    queryFn: () => searchHistories(params),
    placeholderData: keepPreviousData,
    meta: { loading: true },
  });
}

/** 배치 최근 실행 이력 조회 query */
export function useRecentHistoriesQuery(jobId: string) {

  return useQuery({
    queryKey: batchHistoryKeys.recent(jobId),
    queryFn: () => searchHistories({ ...DEFAULT_SEARCH, searchType: HISTORY_SEARCH_TYPE_ID, keyword: jobId, size: RECENT_SIZE }),
    meta: { loading: true },
  });
}

/** 배치 재시작 mutation */
export function useRestartHistoryMutation() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restartHistory,
    onSuccess: () => Promise.all([
      queryClient.invalidateQueries({ queryKey: batchHistoryKeys.all }),
      queryClient.invalidateQueries({ queryKey: batchJobKeys.all }),
    ]),
  });
}
