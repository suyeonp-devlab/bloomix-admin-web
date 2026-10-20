import type { PageParams } from "@/lib/api/api.type";

// 코드 그룹 목록 조회 요청
export type CommonCodeGroupListRequest = PageParams & {
  searchType: string;   // 검색 구분
  keyword: string;      // 검색어
  enabled?: boolean;    // 사용 여부
};

// 코드 그룹 목록 조회 응답
export type CommonCodeGroupListResponse = {
  groupCode: string;           // 그룹 코드
  groupName: string;           // 그룹명
  description: string | null;  // 설명
  enabled: boolean;            // 사용 여부
  updatedAt: string;           // 수정일시
};

// 코드 그룹 상세 조회 응답
export type CommonCodeGroupResponse = {
  groupCode: string;            // 그룹 코드
  groupName: string;            // 그룹명
  description: string | null;   // 설명
  enabled: boolean;             // 사용 여부
  createdAt: string;            // 등록일시
  updatedAt: string;            // 수정일시
  codes: CommonCodeResponse[];  // 코드 목록
};

// 코드 조회 응답
export type CommonCodeResponse = {
  code: string;               // 코드
  codeName: string;           // 코드명
  sortOrder: number;          // 정렬 순서
  enabled: boolean;           // 사용 여부
  etc1: string | null;        // 기타1
  etc2: string | null;        // 기타2
  etc3: string | null;        // 기타3
};

// 코드 그룹 + 코드 일괄 등록 및 수정 요청
export type CommonCodeGroupRequest = {
  groupCode: string;            // 그룹 코드
  groupName: string;            // 그룹명
  description: string | null;   // 설명
  enabled: boolean;             // 사용 여부
  codes: CommonCodeResponse[];  // 코드 목록
};
