import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};

/** 공통 폼 필드 (label + 입력 + 오류 메시지) */
export function FormField({
  label,
  htmlFor,
  error,
  required,
  children
}: FormFieldProps) {

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-fg-secondary">
        {label}
        {required && <span className="ml-0.5 text-danger" aria-hidden>*</span>}
      </label>
      {children}
      {error && <p role="alert" className="text-sm text-danger">{error}</p>}
    </div>
  );
}
