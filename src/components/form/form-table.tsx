import type { ReactNode } from "react";

/** 공통 라벨-값 표 (FormTable > FormRow > FormCell 구성 */
export function FormTable({ children }: { children: ReactNode }) {

  return (
    <table className="w-full table-fixed border-collapse text-base">
      <tbody>{children}</tbody>
    </table>
  );
}
