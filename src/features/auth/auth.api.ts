import type { RequestOptions } from "@/lib/api/api.type";
import { get, post } from "@/lib/api/client";
import type { LoginRequest, LoginResponse, MeResponse } from "./auth.type";

const BASE = "/api/auth";

// 로그인
export function login(body: LoginRequest) {
  return post<LoginResponse>(`${BASE}/login`, body);
}

// 로그아웃
export function logout() {
  return post(`${BASE}/logout`);
}

// 내 정보 조회
export function getMe(options: RequestOptions = {}) {
  return get<MeResponse>(`${BASE}/me`, { showError: options.showError });
}
