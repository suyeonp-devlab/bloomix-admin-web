// 셀렉트박스용 코드 조회 응답
export type CodeOptionResponse = {
  code: string;           // 코드
  codeName: string;       // 코드명
  sortOrder: number;      // 정렬 순서
  enabled: boolean;       // 사용 여부
  etc1: string | null;    // 기타1
  etc2: string | null;    // 기타2
  etc3: string | null;    // 기타3
};

// 셀렉트 옵션
export type CodeOption = {
  value: string;   // 코드
  label: string;   // 코드명
};
