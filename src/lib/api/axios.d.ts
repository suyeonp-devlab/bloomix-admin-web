import "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    showError?: boolean;   // 공통 오류 alert 표시 여부 (기본 true)
  }
}
