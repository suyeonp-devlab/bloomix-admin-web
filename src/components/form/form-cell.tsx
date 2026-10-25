import type { ReactNode } from "react";

type FormCellProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  span?: number;
  children: ReactNode;
};

/** 공통 라벨-값 표의 칸 (라벨 칸 + 값 칸) */
export function FormCell({
  label,
  htmlFor,
  required,
  error,
  span = 1,
  children
}: FormCellProps) {

  return (
    <>
      <th className="w-32 border-r border-b border-line bg-subtle px-3 py-2 text-left align-middle text-sm font-medium text-fg-secondary">
        <label htmlFor={htmlFor}>
          {label}
          {required && <span className="ml-0.5 text-danger" aria-hidden>*</span>}
        </label>
      </th>
      <td colSpan={span} className="border-r border-b border-line p-1.5 align-top last:border-r-0">
        {children}
        {error && <p role="alert" className="mt-1 px-1 text-sm text-danger">{error}</p>}
      </td>
    </>
  );
}
