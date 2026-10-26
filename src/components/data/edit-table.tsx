import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { tableMaxHeight } from "@/lib/utils/table-scroll";

// 행 높이(px) (입력칸 + 셀 여백)
const ROW_HEIGHT = 45;

export type EditTableColumn<T> = {
  key: string;
  header: string;
  required?: boolean;
  className?: string;
  render: (row: T, index: number) => ReactNode;
};

type EditTableProps<T> = {
  columns: EditTableColumn<T>[];
  rows: T[] | undefined;
  rowKey: (row: T) => string;
  emptyText?: string;
};

/** 공통 수정 표 */
export function EditTable<T>({
  columns,
  rows,
  rowKey,
  emptyText = "등록된 데이터가 없습니다.",
}: EditTableProps<T>) {

  return (
    <div style={{ maxHeight: tableMaxHeight(ROW_HEIGHT) }} className="overflow-auto">
      <table className="w-full table-fixed border-separate border-spacing-0 text-base">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "sticky top-0 z-10 h-9 border-r border-b border-line bg-subtle px-2.5 text-center text-sm font-medium text-fg-secondary",
                  "last:border-r-0",
                  column.className,
                )}
              >
                {column.header}
                {column.required && <span className="ml-0.5 text-danger" aria-hidden>*</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, index) => (
            <tr key={rowKey(row)} className="last:[&>td]:border-b-0">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    "border-r border-b border-line p-1.5",
                    "last:border-r-0",
                    column.className
                  )}
                >
                  {column.render(row, index)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows?.length === 0 && (
        <div className="sticky left-0 flex h-24 items-center justify-center text-fg-muted">
          {emptyText}
        </div>
      )}
    </div>
  );
}
