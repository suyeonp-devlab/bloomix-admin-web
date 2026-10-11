import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import type { ApiResponse } from "./api.type";
import { handleApiError, toApiError } from "./error";

const CSRF_PATH = "/api/auth/csrf";
const CSRF_COOKIE = "XSRF-TOKEN";

// CSRF 토큰이 필요 없는 메서드
const SAFE_METHODS = ["get", "head", "options"];

// CSRF 토큰 발급 중인 요청
let csrfRequest: Promise<void> | null = null;

// admin-api axios 인스턴스
export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15_000,
  withCredentials: true,
  withXSRFToken: true,
});

// 요청 인터셉터
http.interceptors.request.use(async (config) => {
  const method = (config.method ?? "get").toLowerCase();
  if (!SAFE_METHODS.includes(method)) await ensureCsrfToken();
  return config;
});

// 응답 인터셉터
http.interceptors.response.use(
  (response) => {

    const body = response.data as Partial<ApiResponse<unknown>> | undefined;
    if (body?.success === false) {
      const error = toApiError(response.status, body);
      void handleApiError(error, response.config);
      return Promise.reject(error);
    }

    return response;
  },
  (error: AxiosError<ApiResponse<unknown>>) => {

    // 요청 취소는 처리하지 않음 (화면 이동 등)
    if (axios.isCancel(error)) return Promise.reject(error);

    const apiError = toApiError(error.response?.status, error.response?.data);
    void handleApiError(apiError, error.config);
    return Promise.reject(apiError);
  },
);

// CSRF 토큰 쿠키 확인 및 발급
async function ensureCsrfToken() {

  const hasCookie = document.cookie.split("; ").some((c) => c.startsWith(`${CSRF_COOKIE}=`));
  if (hasCookie) return;

  csrfRequest ??= (async () => {
    try { await http.get(CSRF_PATH); }
    finally { csrfRequest = null; }
  })();

  await csrfRequest;
}

// GET
export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await http.get<ApiResponse<T>>(url, config);
  return data.data;
}

// POST
export async function post<T = void>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await http.post<ApiResponse<T>>(url, body, config);
  return data.data;
}

// PUT
export async function put<T = void>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await http.put<ApiResponse<T>>(url, body, config);
  return data.data;
}

// DELETE
export async function del<T = void>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await http.delete<ApiResponse<T>>(url, config);
  return data.data;
}
