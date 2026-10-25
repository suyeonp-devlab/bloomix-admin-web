import type { ReactNode } from "react";

/** 공통 라벨-값 표의 한 줄 */
export function FormRow({ children }: { children: ReactNode }) {

  return (
    <tr className="last:[&>*]:border-b-0">{children}</tr>
  );
}
