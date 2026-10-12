import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

// 입력 크기
type InputSize = "md" | "lg";

type InputProps = Omit<ComponentProps<"input">, "size"> & {
  invalid?: boolean;
  size?: InputSize;
};

/** 공통 input */
export function Input({
  invalid,
  size = "md",
  className,
  ...props
}: InputProps) {

  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(
        "w-full rounded-sm border bg-surface text-fg",
        "placeholder:text-fg-muted",
        "focus:border-primary-400 focus:ring-1 focus:ring-primary-200 focus:outline-none",
        "disabled:cursor-not-allowed disabled:border-line disabled:bg-subtle disabled:text-fg-muted",
        invalid ? "border-danger-line" : "border-line-strong",
        SIZE_CLASS[size],
        className,
      )}
      {...props}
    />
  );
}

// 입력 크기에 따른 className
const SIZE_CLASS: Record<InputSize, string> = {
  md: "h-8 px-2.5 text-base",
  lg: "h-10 px-3 text-md",
};
