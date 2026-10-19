import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

type CheckboxProps = Omit<ComponentProps<"input">, "type"> & {
  label?: string;
};

/** 공통 checkbox */
export function Checkbox({
  label,
  className,
  ...props
}: CheckboxProps) {

  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center gap-1.5 text-base",
        "has-disabled:cursor-not-allowed has-disabled:text-fg-muted",
        className,
      )}
    >
      <input
        type="checkbox"
        className={cn(
          "size-4 cursor-pointer accent-primary-600",
          "disabled:cursor-not-allowed"
        )}
        {...props}
      />
      {label}
    </label>
  );
}
