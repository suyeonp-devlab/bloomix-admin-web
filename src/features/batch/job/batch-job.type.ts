import type { PageParams } from "@/lib/api/api.type";
import type { BatchStatus } from "../history/batch-history.type";

// 배치 목록 조회 요청
export type BatchJobListRequest = PageParams & {
  searchType: string;   // 검색구분
  keyword: string;      // 검색어
  enabled: string;      // 사용 여부
};

// 배치
export type BatchJob = {
  jobId: string;                    // 배치 ID
  jobName: string;                  // 배치명
  description: string | null;       // 설명
  cronExpression: string | null;    // 실행 주기
  enabled: boolean;                 // 사용 여부
  updatedBy: string;                // 수정자
  updatedAt: string;                // 수정일시
  lastHistoryId: number | null;     // 최근 실행 이력 ID
  lastStatus: BatchStatus | null;   // 최근 실행 상태
  lastStatusName: string | null;    // 최근 실행 상태명
  lastStartedAt: string | null;     // 최근 실행 시작일시
  lastEndedAt: string | null;       // 최근 실행 종료일시
};

// 배치 등록 및 수정 요청
export type BatchJobFormRequest = {
  jobId: string;                   // 배치 ID
  jobName: string;                 // 배치명
  description: string | null;      // 설명
  cronExpression: string | null;   // 실행 주기
  enabled: boolean;                // 사용 여부
};

// 배치 즉시 실행 요청
export type BatchJobRunRequest = {
  parameters?: Record<string, string>;   // 실행 파라미터
};
