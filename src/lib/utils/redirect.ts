/** 이동 경로 관련 유틸 */

const HOME_PATH = "/";
export const LOGIN_PATH = "/login";

// 안전한 이동 경로 반환
export function toSafeRedirect(value: string | string[] | undefined) {

  const path = Array.isArray(value) ? value[0] : value;

  if (!path || !path.startsWith("/") || path.startsWith("//") || path.startsWith("/\\")) {
    return HOME_PATH;
  }

  return path;
}
