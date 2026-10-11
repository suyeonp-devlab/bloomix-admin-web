import type { ReactNode } from "react";

type ErrorStateProps = {
  title: string;
  description?: string;
  header?: ReactNode;
  actions?: ReactNode;  // 하단 버튼
};

/** 공통 오류 상태 */
export function ErrorState({
  title,
  description,
  header,
  actions
}: ErrorStateProps) {

  return (
    <div role="alert" className="w-full max-w-sm rounded-md border border-line bg-surface p-8">
      {header && <div className="mb-6 border-b border-line pb-4">{header}</div>}
      <h2 className="text-lg font-medium">{title}</h2>
      {description && <p className="mt-1 text-base text-fg-secondary">{description}</p>}
      {actions && <div className="mt-6 flex gap-2">{actions}</div>}
    </div>
  );
}
