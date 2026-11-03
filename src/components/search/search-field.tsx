import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type SearchFieldProps = {
  label: string;
  className?: string;
  labelClassName?: string;
  children: ReactNode;
};

/** 공통 검색 필드 */
export function SearchField({
  label,
  className,
  labelClassName,
  children
}: SearchFieldProps) {

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("shrink-0 text-sm font-medium whitespace-nowrap text-fg-secondary", labelClassName)}>
        {label}
      </span>
      <div className="flex min-w-0 flex-1 items-center gap-2 pl-2">
        {children}
      </div>
    </div>
  );
}
