import { ChevronRight } from "lucide-react";

type PageHeaderProps = {
  title: string;
  breadcrumb: string[];
};

/** 공통 본문 상단 (메뉴명 + breadcrumb) */
export function PageHeader({ title, breadcrumb }: PageHeaderProps) {

  return (
    <div className="-mx-4 -mt-6 mb-2 flex items-center justify-between border-b border-line bg-surface px-4 py-4">
      <h1 className="text-xl font-semibold">{title}</h1>
      <nav aria-label="breadcrumb">
        <ol className="flex items-center gap-1 text-xs text-fg-secondary">
          {breadcrumb.map((item, index) => (
            <li
              key={`${item}-${index}`}
              aria-current={index === breadcrumb.length - 1 ? "page" : undefined}
              className="flex items-center gap-1"
            >
              {index > 0 && <ChevronRight className="size-3" aria-hidden />}
              {item}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
