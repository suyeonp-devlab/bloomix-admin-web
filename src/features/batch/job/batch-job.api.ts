import type { PageResponse } from "@/lib/api/api.type";
import { get, post, put } from "@/lib/api/client";
import type { BatchJob, BatchJobFormRequest, BatchJobListRequest, BatchJobRunRequest } from "./batch-job.type";

const BASE = "/api/batch-jobs";

// 배치 목록 조회
export function searchJobs(params: BatchJobListRequest) {
  const enabled = params.enabled === "Y" ? true : params.enabled === "N" ? false : undefined;
  return get<PageResponse<BatchJob>>(BASE, { params: { ...params, enabled } });
}

// 배치 상세 조회
export function getJob(jobId: string) {
  return get<BatchJob>(`${BASE}/${encodeURIComponent(jobId)}`);
}

// 배치 등록
export function createJob(body: BatchJobFormRequest) {
  return post(BASE, body);
}

// 배치 수정
export function updateJob(jobId: string, body: BatchJobFormRequest) {
  return put(`${BASE}/${encodeURIComponent(jobId)}`, body);
}

// 배치 즉시 실행
export function runJob(jobId: string, body: BatchJobRunRequest) {
  return post(`${BASE}/${encodeURIComponent(jobId)}/executions`, body);
}
