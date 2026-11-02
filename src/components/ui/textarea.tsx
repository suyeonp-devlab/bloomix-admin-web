import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

type TextareaProps = ComponentProps<"textarea"> & {
  invalid?: boolean;
};

/** 공통 textarea */
export function Textarea({
  invalid,
  className,
  ...props
}: TextareaProps) {

  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={cn(
        "block w-full resize-y rounded-sm border bg-surface px-2.5 py-1.5 text-base text-fg",
        "placeholder:text-fg-muted",
        "focus:border-primary-400 focus:ring-1 focus:ring-primary-200 focus:outline-none",
        "disabled:cursor-not-allowed disabled:border-line disabled:bg-subtle disabled:text-fg-muted",
        "read-only:bg-subtle read-only:text-fg-secondary",
        invalid ? "border-danger-line" : "border-line-strong",
        className,
      )}
      {...props}
    />
  );
}
