import type { PageResponse } from "@/lib/api/api.type";
import { get, put } from "@/lib/api/client";
import type { User, UserListRequest, UserStatusRequest } from "./user.type";

const BASE = "/api/users";

// 회원 목록 조회
export function searchUsers(params: UserListRequest) {
  return get<PageResponse<User>>(BASE, { params });
}

// 회원 상세 조회
export function getUser(userId: string) {
  return get<User>(`${BASE}/${encodeURIComponent(userId)}`);
}

// 회원 상태 변경
export function updateUserStatus(userId: string, body: UserStatusRequest) {
  return put(`${BASE}/${encodeURIComponent(userId)}/status`, body);
}
