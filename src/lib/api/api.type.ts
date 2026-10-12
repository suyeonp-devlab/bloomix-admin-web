// api 공통 응답
export type ApiResponse<T> = {
  success: boolean;         // 성공 여부
  code: string;             // 응답 코드
  message: string | null;   // 메시지
  data: T;                  // 데이터
};

// api 공통 응답 (페이징)
export type PageResponse<T> = {
  content: T[];             // 목록
  page: number;             // 현재 페이지
  size: number;             // 페이지 크기
  totalElements: number;    // 전체 건수
  totalPages: number;       // 전체 페이지 수
  isLast: boolean;          // 마지막 페이지 여부
};

// 페이징 요청 조건
export type PageParams = {
  page: number;     // 현재 페이지
  size: number;     // 페이지 크기
};

// api 요청 옵션
export type RequestOptions = {
  loading?: boolean;     // 전체 로딩 표시 여부
  showError?: boolean;   // 공통 오류 alert 표시 여부
};
