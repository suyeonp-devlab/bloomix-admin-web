// 별도 처리가 필요한 오류 코드
export const ERROR_CODE = {
  UNAUTHORIZED: "AUTH_001",       // 로그인 필요
  ACCOUNT_LOCKED: "AUTH_004",     // 계정 잠김
  ACCOUNT_DISABLED: "AUTH_005",   // 계정 비활성
  NETWORK: "NETWORK_ERROR",       // 응답 없음
  UNKNOWN: "UNKNOWN_ERROR",       // 알수 없음
} as const;
