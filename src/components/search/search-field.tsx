import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

// 차지하는 열 (1~12)
type SearchFieldSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type SearchFieldProps = {
  label: string;
  span?: SearchFieldSpan;
  labelClassName?: string;
  children: ReactNode;
};

/** 공통 검색 필드 */
export function SearchField({
  label,
  span = 4,
  labelClassName,
  children
}: SearchFieldProps) {

  return (
    <div className={cn("flex items-center gap-2", SPAN_CLASS[span])}>
      <span className={cn("shrink-0 text-sm font-medium whitespace-nowrap text-fg-secondary", labelClassName)}>
        {label}
      </span>
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {children}
      </div>
    </div>
  );
}

// 차지하는 열 수에 따른 className
const SPAN_CLASS: Record<SearchFieldSpan, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};
