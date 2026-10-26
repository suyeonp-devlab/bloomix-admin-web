import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

// 선택 크기
type SelectSize = "md" | "lg";

type SelectProps = Omit<ComponentProps<"select">, "size"> & {
  invalid?: boolean;
  size?: SelectSize;
};

/** 공통 select */
export function Select({
  invalid,
  size = "md",
  className,
  children,
  ...props
}: SelectProps) {

  return (
    <div className={cn("relative", className)}>
      <select
        aria-invalid={invalid || undefined}
        className={cn(
          "w-full appearance-none rounded-sm border bg-surface pr-8 text-fg",
          "focus:border-primary-400 focus:ring-1 focus:ring-primary-200 focus:outline-none",
          "disabled:cursor-not-allowed disabled:border-line disabled:bg-subtle disabled:text-fg-muted",
          invalid ? "border-danger-line" : "border-line-strong",
          SIZE_CLASS[size],
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-fg-muted"
        aria-hidden
      />
    </div>
  );
}

// 선택 크기에 따른 className
const SIZE_CLASS: Record<SelectSize, string> = {
  md: "h-8 pl-2.5 text-base",
  lg: "h-10 pl-3 text-md",
};
