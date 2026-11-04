import type { PageParams } from "@/lib/api/api.type";

// 회원 가입 수단
export type UserProvider = "LOCAL" | "GOOGLE" | "NAVER";

// 회원 상태
export type UserStatus = "ACTIVE" | "LOCKED" | "SUSPENDED" | "WITHDRAWN";

// 회원 목록 조회 요청
export type UserListRequest = PageParams & {
  searchType: string;   // 검색구분
  keyword: string;      // 검색어
  provider: string;     // 가입 수단
  status: string;       // 회원 상태
  joinedFrom: string;   // 가입일 (부터)
  joinedTo: string;     // 가입일 (까지)
};

// 회원
export type User = {
  userId: string;                     // 회원 ID
  provider: UserProvider;             // 가입 수단
  providerName: string | null;        // 가입 수단명
  providerId: string | null;          // 계정 ID (마스킹)
  email: string | null;               // 이메일 (마스킹)
  nickname: string | null;            // 닉네임
  status: UserStatus;                 // 회원 상태
  statusName: string | null;          // 회원 상태명
  passwordFailCount: number;          // 비밀번호 연속 실패 횟수
  passwordChangedAt: string | null;   // 비밀번호 변경일시
  lastLoginAt: string | null;         // 최근 로그인일시
  joinedAt: string;                   // 가입일시
};

// 회원 상태 변경 요청
export type UserStatusRequest = {
  status: UserStatus;   // 변경할 상태
};
