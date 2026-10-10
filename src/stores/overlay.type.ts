import type { ReactNode } from "react";

// alert 옵션
export type AlertOptions = {
  title?: string;         // 제목
  confirmText?: string;   // 확인버튼 문구
};

// confirm 옵션
export type ConfirmOptions = {
  title?: string;                // 제목
  confirmText?: string;          // 확인버튼 문구
  cancelText?: string;           // 취소버튼 문구
  tone?: "default" | "danger";   // 확인버튼 색상
};

// popup 옵션
export type PopupOptions = {
  size?: "sm" | "md" | "lg" | number;   // 팝업 너비 (프리셋 또는 px)
};

// 열린 alert
export type AlertItem = {
  id: number;              // overlay 식별자
  type: "alert";           // overlay 종류
  message: string;         // 메시지
  options: AlertOptions;   // alert 옵션
  resolve: () => void;     // alert 콜백
};

// 열린 confirm
export type ConfirmItem = {
  id: number;                       // overlay 식별자
  type: "confirm";                  // overlay 종류
  message: string;                  // 메시지
  options: ConfirmOptions;          // confirm 옵션
  resolve: (ok: boolean) => void;   // confirm 콜백
};

// 열린 popup
export type PopupItem = {
  id: number;               // overlay 식별자
  type: "popup";            // overlay 종류
  title: string;            // 제목
  content: ReactNode;       // 본문
  options: PopupOptions;    // popup 옵션
};

// overlay 항목
export type OverlayItem = AlertItem | ConfirmItem | PopupItem;
