import { useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { overlay } from "@/stores/overlay-store";
import { CellCopyPopup } from "./popup/cell-copy-popup";

// 컬럼 최소 폭(px)
const MIN_COLUMN_WIDTH = 60;

export type DataTableColumn<T> = {
  key: string;
  header: string;
  className?: string;
  render?: (row: T) => ReactNode;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[] | undefined;
  rowKey: (row: T) => string;
  onRowDoubleClick?: (row: T) => void;
  emptyText?: string;
};

type SelectedCell = {
  rowKey: string;
  columnKey: string;
  text: string;
};

/**
 * 공통 그리드
 * - 셀 클릭: 행 선택, 더블클릭/Enter: onRowDoubleClick, Ctrl+C: 선택한 셀 값 복사
 * - 헤더 오른쪽 경계를 드래그해서 컬럼 폭 조절
 */
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  onRowDoubleClick,
  emptyText = "조회된 데이터가 없습니다.",
}: DataTableProps<T>) {

  // 선택된 cell
  const [selected, setSelected] = useState<SelectedCell | null>(null);

  // 조절 후 컬럼 폭
  const [widths, setWidths] = useState<Record<string, number>>({});

  const headerRefs = useRef<Record<string, HTMLTableCellElement | null>>({});

  const resized = Object.keys(widths).length > 0;
  const totalWidth = Object.values(widths).reduce((sum, width) => sum + width, 0);

  // 컬럼 폭 조절
  const handleResize = (e: ReactPointerEvent<HTMLSpanElement>, columnKey: string) => {

    e.preventDefault();
    e.stopPropagation();

    const current: Record<string, number> = {};
    for (const column of columns) {
      current[column.key] = headerRefs.current[column.key]?.offsetWidth ?? MIN_COLUMN_WIDTH;
    }

    setWidths(current);

    const startX = e.clientX;
    const startWidth = current[columnKey];

    const handleMove = (event: PointerEvent) => {
      const next = Math.max(MIN_COLUMN_WIDTH, startWidth + event.clientX - startX);
      setWidths((prev) => ({ ...prev, [columnKey]: next }));
    };

    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  };

  // 키 처리 (Esc: 선택 해제, Enter: 행 동작, Ctrl+C: 셀 값 복사)
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {

    if (!selected) return;

    if (e.key === "Escape") {
      setSelected(null);
      return;
    }

    if (e.key === "Enter") {
      const row = rows?.find((item) => rowKey(item) === selected.rowKey);
      if (row) onRowDoubleClick?.(row);
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
      e.preventDefault();
      overlay.open("셀 복사", <CellCopyPopup value={selected.text} />, { size: "sm" });
    }
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setSelected(null);
      }}
      className="overflow-x-auto bg-surface focus:outline-none"
    >
      <table
        className={cn("table-fixed border-collapse text-base", !resized && "w-full")}
        style={resized ? { width: totalWidth, minWidth: "100%" } : undefined}
      >
        {resized && (
          <colgroup>
            {columns.map((column) => (
              <col key={column.key} style={{ width: widths[column.key] }} />
            ))}
          </colgroup>
        )}
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                ref={(el) => { headerRefs.current[column.key] = el; }}
                className={cn(
                  "relative h-9 truncate border-r border-b border-line bg-subtle px-2.5 text-sm font-medium text-fg-secondary",
                  "last:border-r-0",
                  column.className,
                  "text-center",
                )}
              >
                {column.header}
                <span
                  role="separator"
                  aria-orientation="vertical"
                  aria-label={`${column.header} 폭 조절`}
                  onPointerDown={(e) => handleResize(e, column.key)}
                  className="absolute top-0 right-0 h-full w-2 cursor-col-resize touch-none hover:bg-primary-200"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row) => {

            const key = rowKey(row);
            const selectedRow = selected?.rowKey === key;

            return (
              <tr
                key={key}
                aria-selected={selectedRow}
                onDoubleClick={() => onRowDoubleClick?.(row)}
                className={cn(
                  "last:[&>td]:border-b-0",
                  onRowDoubleClick && "cursor-pointer select-none",
                  selectedRow ? "bg-primary-50" : "hover:bg-subtle",
                )}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    onClick={(e) => {
                      setSelected({ rowKey: key, columnKey: column.key, text: e.currentTarget.textContent ?? "" })}
                    }
                    className={cn(
                      "h-8 truncate border-r border-b border-line px-2.5",
                      "last:border-r-0",
                      column.className,
                    )}
                  >
                    {renderCell(column, row)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {rows?.length === 0 && (
        <div className="sticky left-0 flex h-40 items-center justify-center text-fg-muted">
          {emptyText}
        </div>
      )}
    </div>
  );
}

// 셀 값
function renderCell<T>(column: DataTableColumn<T>, row: T): ReactNode {

  if (column.render) return column.render(row);

  const value = (row as unknown as Record<string, unknown>)[column.key];
  return value == null ? "" : String(value);
}
