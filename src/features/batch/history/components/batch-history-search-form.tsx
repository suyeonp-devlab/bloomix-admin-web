"use client";

import { useState } from "react";
import { SearchField } from "@/components/search/search-field";
import { SearchPanel } from "@/components/search/search-panel";
import { SearchRow } from "@/components/search/search-row";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useCodeOptionsQuery } from "@/lib/code-option/code-option.queries";
import type { BatchHistoryListRequest } from "../batch-history.type";

type BatchHistorySearchFormProps = {
  search: BatchHistoryListRequest;
  onSearchAction: (condition: Partial<BatchHistoryListRequest>) => void;
  onResetAction: () => void;
};

/** 배치 실행 이력 > 검색 영역 */
export function BatchHistorySearchForm({
  search,
  onSearchAction,
  onResetAction
}: BatchHistorySearchFormProps) {

  const { data: searchTypes = [] } = useCodeOptionsQuery("BATCH_JOB_SEARCH", { placeholder: "선택" });
  const { data: statuses = [] } = useCodeOptionsQuery("BATCH_STATUS", { placeholder: "전체" });

  // 검색조건
  const [searchType, setSearchType] = useState(search.searchType);
  const [keyword, setKeyword] = useState(search.keyword);
  const [status, setStatus] = useState(search.status);
  const [startedFrom, setStartedFrom] = useState(search.startedFrom);
  const [startedTo, setStartedTo] = useState(search.startedTo);

  // 선택한 검색구분
  const selectedSearchType = searchTypes.find(item => item.value === searchType);

  return (
    <SearchPanel
      onSearch={() => onSearchAction({ searchType, keyword: keyword.trim(), status, startedFrom, startedTo })}
      onReset={onResetAction}
    >
      <SearchRow>
        <SearchField label="시작일시">
          <Input
            type="date"
            className="w-32"
            aria-label="시작일 부터"
            value={startedFrom}
            onChange={(e) => setStartedFrom(e.target.value)}
          />
          <span className="text-fg-muted" aria-hidden>~</span>
          <Input
            type="date"
            className="w-32"
            aria-label="시작일 까지"
            value={startedTo}
            onChange={(e) => setStartedTo(e.target.value)}
          />
        </SearchField>
        <SearchField label="검색어" className="w-96">
          <Select
            className="w-28 shrink-0"
            aria-label="검색구분"
            value={searchType}
            onChange={(e) => {
              setSearchType(e.target.value);
              if (!e.target.value) setKeyword("");
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
      </SearchRow>
      <SearchRow>
        <SearchField label="배치상태">
          <Select
            className="w-32"
            aria-label="상태"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statuses.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </Select>
        </SearchField>
      </SearchRow>
    </SearchPanel>
  );
}
