import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

// 버튼 유형
type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "danger-solid";

// 버튼 크기
type ButtonSize = "sm" | "md";

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/** 공통 button */
export function Button({
  variant = "secondary",
  size = "md",
  type = "button",
  className,
  ...props
}: ButtonProps) {

  return (
    <button
      type={type}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-sm whitespace-nowrap",
        "focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:outline-none",
        "disabled:cursor-not-allowed",
        VARIANT_CLASS[variant],
        SIZE_CLASS[size],
        className,
      )}
      {...props}
    />
  );
}

// 버튼 유형에 따른 className
const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "bg-primary-600 font-medium text-white hover:bg-primary-700 disabled:bg-primary-200",
  secondary: "border border-line-strong bg-surface text-fg hover:bg-subtle disabled:text-fg-muted",
  ghost: "text-fg-secondary hover:bg-subtle hover:text-fg disabled:text-fg-muted",
  danger: "border border-danger-line bg-surface text-danger hover:bg-danger-bg disabled:opacity-50",
  "danger-solid": "bg-danger font-medium text-white hover:opacity-90 disabled:opacity-50",
};

// 버튼 크기에 따른 className
const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: "h-7 px-2.5 text-sm",
  md: "h-8 px-3 text-base",
};
