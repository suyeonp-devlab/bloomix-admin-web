"use client";

import { useState } from "react";
import { SearchField } from "@/components/search/search-field";
import { SearchPanel } from "@/components/search/search-panel";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useCodeOptionsQuery } from "@/lib/code-option/code-option.queries";
import type { CommonCodeGroupListRequest } from "../code.type";

type CodeGroupSearchFormProps = {
  search: CommonCodeGroupListRequest;
  onSearchAction: (condition: Partial<CommonCodeGroupListRequest>) => void;
  onResetAction: () => void;
};

/** 코드 그룹 목록 >  검색 영역 */
export function CodeGroupSearchForm({
  search,
  onSearchAction,
  onResetAction
}: CodeGroupSearchFormProps) {

  const { data: searchTypes = [] } = useCodeOptionsQuery("CODE_GROUP_SEARCH", { placeholder: "선택" });
  const { data: usgTypes = [] } = useCodeOptionsQuery("USG_STATUS", { placeholder: "전체" });

  // 검색조건
  const [searchType, setSearchType] = useState(search.searchType);
  const [keyword, setKeyword] = useState(search.keyword);
  const [enabled, setEnabled] = useState(search.enabled);

  // 선택한 검색구분
  const selectedSearchType = searchTypes.find(item => item.value === searchType);

  return (
    <SearchPanel
      onSearch={() => onSearchAction({ searchType, keyword: keyword.trim(), enabled })}
      onReset={onResetAction}
    >
      <SearchField label="검색어" span={5}>
        <Select
          className="w-28 shrink-0"
          aria-label="검색구분"
          value={searchType}
          onChange={(e) => {
            setSearchType(e.target.value);
            if(!e.target.value) setKeyword("");
          }}
        >
          {searchTypes.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </Select>
        <Input
          className="min-w-0 flex-1"
          aria-label="검색어"
          placeholder={selectedSearchType?.etc1 ?? ""}
          disabled={!searchType}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </SearchField>
      <SearchField label="사용 여부" span={3}>
        <Select
          className="w-28"
          aria-label="사용 여부"
          value={enabled}
          onChange={(e) => setEnabled(e.target.value)}
        >
          {usgTypes.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </Select>
      </SearchField>
    </SearchPanel>
  );
}
