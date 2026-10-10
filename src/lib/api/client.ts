import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import type { ApiResponse } from "./api.type";
import { handleApiError, toApiError } from "./error";

// admin-api axios 인스턴스
export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15_000,
  withCredentials: true,
  withXSRFToken: true,
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
