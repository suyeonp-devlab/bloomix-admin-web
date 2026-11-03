import type { ReactNode } from "react";

type SearchRowProps = {
  children: ReactNode;
};

/** 공통 검색 줄 */
export function SearchRow({ children }: SearchRowProps) {
  return <div className="flex items-center gap-8">{children}</div>;
}
