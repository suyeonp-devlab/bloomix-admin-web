import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { batchHistoryKeys } from "../history/batch-history.keys";
import { createJob, getJob, runJob, searchJobs, updateJob } from "./batch-job.api";
import { batchJobKeys } from "./batch-job.keys";
import type { BatchJobFormRequest, BatchJobListRequest, BatchJobRunRequest } from "./batch-job.type";

/** 배치 목록 조회 query */
export function useSearchJobsQuery(params: BatchJobListRequest) {

  return useQuery({
    queryKey: batchJobKeys.list(params),
    queryFn: () => searchJobs(params),
    placeholderData: keepPreviousData,
    meta: { loading: true },
  });
}

/** 배치 상세 조회 query */
export function useGetJobQuery(jobId: string) {

  return useQuery({
    queryKey: batchJobKeys.detail(jobId),
    queryFn: () => getJob(jobId),
    meta: { loading: true },
  });
}

/** 배치 등록 mutation */
export function useCreateJobMutation() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJob,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: batchJobKeys.lists() }),
  });
}

/** 배치 수정 mutation */
export function useUpdateJobMutation() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, body }: { jobId: string; body: BatchJobFormRequest }) =>
      updateJob(jobId, body),
    onSuccess: () => Promise.all([
      queryClient.invalidateQueries({ queryKey: batchJobKeys.all }),
      queryClient.invalidateQueries({ queryKey: batchHistoryKeys.all }),
    ]),
  });
}

/** 배치 즉시 실행 mutation */
export function useRunJobMutation() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, body }: { jobId: string; body: BatchJobRunRequest }) =>
      runJob(jobId, body),
    onSuccess: () => Promise.all([
      queryClient.invalidateQueries({ queryKey: batchJobKeys.all }),
      queryClient.invalidateQueries({ queryKey: batchHistoryKeys.all }),
    ]),
  });
}
