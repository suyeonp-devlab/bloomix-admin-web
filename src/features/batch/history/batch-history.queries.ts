import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { restartHistory, searchHistories } from "./batch-history.api";
import { batchHistoryKeys } from "./batch-history.keys";
import type { BatchHistoryListRequest } from "./batch-history.type";

/** 배치 실행 이력 목록 조회 query */
export function useSearchHistoriesQuery(params: BatchHistoryListRequest) {

  return useQuery({
    queryKey: batchHistoryKeys.list(params),
    queryFn: () => searchHistories(params),
    placeholderData: keepPreviousData,
    meta: { loading: true },
  });
}

/** 배치 재시작 mutation */
export function useRestartHistoryMutation() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restartHistory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: batchHistoryKeys.all }),
  });
}
