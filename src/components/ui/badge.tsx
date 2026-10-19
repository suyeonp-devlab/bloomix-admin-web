import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

// 배지 유형
type BadgeVariant = "success" | "neutral" | "danger" | "warning";

type BadgeProps = ComponentProps<"span"> & {
  variant?: BadgeVariant;
};

/** 공통 badge */
export function Badge({
  variant = "neutral",
  className,
  ...props
}: BadgeProps) {

  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded-sm px-1.5 text-xs font-medium whitespace-nowrap",
        VARIANT_CLASS[variant],
        className,
      )}
      {...props}
    />
  );
}

// 배지 유형에 따른 className
const VARIANT_CLASS: Record<BadgeVariant, string> = {
  success: "bg-success-bg text-success",
  neutral: "bg-neutral-bg text-neutral",
  danger: "bg-danger-bg text-danger",
  warning: "bg-warning-bg text-warning",
};
