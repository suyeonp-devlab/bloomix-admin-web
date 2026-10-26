import type { ReactNode } from "react";

type FormSectionProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;  // 상단 우측
  children: ReactNode;
};

/** 공통 폼 section (제목 줄 + 테두리 박스) */
export function FormSection({
  title,
  subtitle,
  actions,
  children
}: FormSectionProps) {

  return (
    <section className="overflow-hidden rounded-md border border-line bg-surface">
      <div className="flex min-h-11 items-center justify-between border-b border-line px-4 py-2">
        <div className="flex items-baseline gap-2">
          <h2 className="text-md font-semibold">{title}</h2>
          {subtitle && <p className="text-sm text-fg-muted">{subtitle}</p>}
        </div>
        {actions}
      </div>
      <div>{children}</div>
    </section>
  );
}
