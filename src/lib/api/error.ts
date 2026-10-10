import type { AxiosRequestConfig } from "axios";
import { overlay } from "@/stores/overlay-store";
import type { ApiResponse } from "./api.type";
import { ERROR_CODE } from "./error-code";

const LOGIN_PATH = "/login";
const DEFAULT_MESSAGE = "요청을 처리하지 못했습니다.\n잠시 후 다시 시도해주세요.";
const NETWORK_MESSAGE = "서버와 통신할 수 없습니다.\n잠시 후 다시 시도해주세요.";

// 표시 중인 오류 alert (같은 메시지는 다시 띄우지 않음)
const openAlerts = new Map<string, Promise<void>>();

// 로그인 화면 이동 중 여부
let redirecting = false;

// api 오류
export class ApiError extends Error {
  readonly code: string;      // 오류 코드
  readonly status?: number;   // HTTP 상태

  constructor(message: string, code: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
  }
}

// 응답 → ApiError 변환
export function toApiError(status?: number, body?: Partial<ApiResponse<unknown>>): ApiError {

  // 서버 공통 응답 형식
  if (body && typeof body.code === "string") {
    return new ApiError(body.message || DEFAULT_MESSAGE, body.code, status);
  }

  // 응답 없음 (네트워크, 타임아웃)
  if (status === undefined) {
    return new ApiError(NETWORK_MESSAGE, ERROR_CODE.NETWORK);
  }

  // 알수 없음
  return new ApiError(DEFAULT_MESSAGE, ERROR_CODE.UNKNOWN, status);
}

// 공통 오류 처리
export async function handleApiError(error: ApiError, config?: AxiosRequestConfig) {

  /**
   * - UNAUTHORIZED: alert 없이 로그인 화면 이동
   * - ACCOUNT_LOCKED/ACCOUNT_DISABLED: alert 후 로그인 화면 이동
   * - 그 외: 서버 message로 alert (showError: false면 생략)
   */

  if (error.code === ERROR_CODE.UNAUTHORIZED) {
    redirectToLogin();
    return;
  }

  const sessionEnded =
    error.code === ERROR_CODE.ACCOUNT_LOCKED || error.code === ERROR_CODE.ACCOUNT_DISABLED;

  if (config?.showError === false) {
    if (sessionEnded) redirectToLogin();
    return;
  }

  await showErrorAlert(error.message);
  if (sessionEnded) redirectToLogin();
}

// 오류 alert 표시
function showErrorAlert(message: string): Promise<void> {

  const opened = openAlerts.get(message);
  if (opened) return opened;

  const alert = overlay.alert(message).finally(() => openAlerts.delete(message));
  openAlerts.set(message, alert);
  return alert;
}

// 로그인 화면으로 이동
function redirectToLogin() {

  if (typeof window === "undefined" || redirecting) return;
  if (window.location.pathname === LOGIN_PATH) return;

  redirecting = true;

  const params = new URLSearchParams({ redirect: window.location.pathname + window.location.search });
  window.location.replace(`${LOGIN_PATH}?${params}`);  // 캐시·store 초기화
}
