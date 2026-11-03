import type { PageParams } from "@/lib/api/api.type";

// 배치 실행 상태
export type BatchStatus = "RUNNING" | "COMPLETED" | "FAILED";

// 배치 실행 구분
export type BatchTriggerType = "SCHEDULED" | "MANUAL" | "RESTART";

// 배치 실행 이력 목록 조회 요청
export type BatchHistoryListRequest = PageParams & {
  searchType: string;    // 검색구분
  keyword: string;       // 검색어
  status: string;        // 실행 상태
  triggerType: string;   // 실행 구분
  startedFrom: string;   // 시작일 (부터)
  startedTo: string;     // 시작일 (까지)
};

// 배치 실행 이력
export type BatchHistory = {
  historyId: number;                          // 실행 이력 ID
  jobId: string;                              // 배치 ID
  jobName: string;                            // 배치명
  triggerType: BatchTriggerType;              // 실행 구분
  triggerTypeName: string | null;             // 실행 구분명
  parameters: Record<string, string> | null;  // 실행 파라미터
  status: BatchStatus;                        // 실행 상태
  statusName: string | null;                  // 실행 상태명
  startedAt: string;                          // 시작일시
  endedAt: string | null;                     // 종료일시
  message: string | null;                     // 메시지
  executedBy: string;                         // 실행자
};
