import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import type { ReactNode } from "react";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils/cn";

// 페이지 크기
export const PAGE_SIZES = [20, 50, 100];
const BLOCK_SIZE = 5;

type PaginationProps = {
  page: number;
  totalPages: number;
  totalElements: number;
  size: number;
  onPageChange: (page: number) => void;
  onSizeChange: (size: number) => void;
  className?: string;
};

type PageButtonProps = {
  label: string;
  current?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
};

/** 공통 페이지네이션 */
export function Pagination({
  page,
  totalPages,
  totalElements,
  size,
  onPageChange,
  onSizeChange,
  className,
}: PaginationProps) {

  if (totalElements === 0) return null;

  const lastPage = Math.max(totalPages, 1);
  const start = Math.floor((page - 1) / BLOCK_SIZE) * BLOCK_SIZE + 1;
  const end = Math.min(start + BLOCK_SIZE - 1, lastPage);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className={cn("flex items-center rounded-md border border-line bg-subtle px-3 py-1.5", className)}>
      <p className="flex-1 text-base">
        총 <span className="font-medium">{totalElements.toLocaleString()}</span>건
      </p>

      <nav aria-label="페이지" className="flex items-center gap-1">
        <PageButton label="처음" disabled={page === 1} onClick={() => onPageChange(1)}>
          <ChevronsLeft className="size-4" aria-hidden />
        </PageButton>
        <PageButton label="이전" disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          <ChevronLeft className="size-4" aria-hidden />
        </PageButton>
        {pages.map((p) => (
          <PageButton key={p} label={`${p}페이지`} current={p === page} onClick={() => p !== page && onPageChange(p)}>
            {p}
          </PageButton>
        ))}
        <PageButton label="다음" disabled={page >= lastPage} onClick={() => onPageChange(page + 1)}>
          <ChevronRight className="size-4" aria-hidden />
        </PageButton>
        <PageButton label="마지막" disabled={page >= lastPage} onClick={() => onPageChange(lastPage)}>
          <ChevronsRight className="size-4" aria-hidden />
        </PageButton>
      </nav>

      <div className="flex flex-1 items-center justify-end gap-3">
        <Select
          aria-label="페이지 크기"
          value={size}
          onChange={(e) => onSizeChange(Number(e.target.value))}
        >
          {PAGE_SIZES.map((item) => (
            <option key={item} value={item}>{item}건씩</option>
          ))}
        </Select>
      </div>
    </div>
  );
}

/** 페이지 버튼 */
function PageButton({
  label,
  current,
  disabled,
  onClick,
  children
}: PageButtonProps) {

  return (
    <button
      type="button"
      aria-label={label}
      aria-current={current ? "page" : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex h-7 min-w-7 items-center justify-center rounded-sm border px-1.5 text-base",
        "focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:text-fg-muted",
        current ? "border-line-strong bg-surface font-medium text-fg" : "border-transparent text-fg-secondary enabled:hover:bg-subtle",
      )}
    >
      {children}
    </button>
  );
}
