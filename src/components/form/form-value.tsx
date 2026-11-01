import type { ReactNode } from "react";

type FormValueProps = {
  value: ReactNode;
};

/** 공통 라벨-값 표의 읽기 전용 값 */
export function FormValue({ value }: FormValueProps) {
  return <div className="min-h-5 px-1 py-0.5 break-all whitespace-pre-wrap">{value}</div>;
}
