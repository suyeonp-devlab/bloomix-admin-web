import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type SearchPanelProps = {
  onSearch: () => void;
  onReset: () => void;
  children: ReactNode;
};

/** 공통 검색 영역 (SearchRow 줄 + 조회/초기화 버튼) */
export function SearchPanel({
  onSearch,
  onReset,
  children
}: SearchPanelProps) {

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      className="flex items-end gap-4 rounded-md border border-line bg-surface px-4 py-3"
    >
      <div className="flex flex-1 flex-col gap-2">
        {children}
      </div>
      <div className="flex shrink-0 gap-2">
        <Button onClick={onReset}>초기화</Button>
        <Button type="submit" variant="primary-solid">조회</Button>
      </div>
    </form>
  );
}
