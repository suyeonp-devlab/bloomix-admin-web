"use client";

import { useState } from "react";
import { SearchField } from "@/components/search/search-field";
import { SearchPanel } from "@/components/search/search-panel";
import { SearchRow } from "@/components/search/search-row";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useCodeOptionsQuery } from "@/lib/code-option/code-option.queries";
import type { UserListRequest } from "../user.type";

type UserSearchFormProps = {
  search: UserListRequest;
  onSearchAction: (condition: Partial<UserListRequest>) => void;
  onResetAction: () => void;
};

/** 회원 목록 > 검색 영역 */
export function UserSearchForm({
  search,
  onSearchAction,
  onResetAction
}: UserSearchFormProps) {

  const { data: searchTypes = [] } = useCodeOptionsQuery("USER_SEARCH", { placeholder: "선택" });
  const { data: providers = [] } = useCodeOptionsQuery("USER_PROVIDER", { placeholder: "전체" });
  const { data: statuses = [] } = useCodeOptionsQuery("USER_STATUS", { placeholder: "전체" });

  // 검색조건
  const [searchType, setSearchType] = useState(search.searchType);
  const [keyword, setKeyword] = useState(search.keyword);
  const [provider, setProvider] = useState(search.provider);
  const [status, setStatus] = useState(search.status);
  const [joinedFrom, setJoinedFrom] = useState(search.joinedFrom);
  const [joinedTo, setJoinedTo] = useState(search.joinedTo);

  // 선택한 검색구분
  const selectedSearchType = searchTypes.find(item => item.value === searchType);

  return (
    <SearchPanel
      onSearch={() => onSearchAction({ searchType, keyword: keyword.trim(), provider, status, joinedFrom, joinedTo })}
      onReset={onResetAction}
    >
      <SearchRow>
        <SearchField label="가입일자" labelClassName="w-14">
          <Input
            type="date"
            className="w-32"
            aria-label="가입일 부터"
            value={joinedFrom}
            onChange={(e) => setJoinedFrom(e.target.value)}
          />
          <span className="text-fg-muted" aria-hidden>~</span>
          <Input
            type="date"
            className="w-32"
            aria-label="가입일 까지"
            value={joinedTo}
            onChange={(e) => setJoinedTo(e.target.value)}
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
        <SearchField label="가입 수단" labelClassName="w-14">
          <Select
            className="w-32"
            aria-label="가입 수단"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          >
            {providers.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </Select>
        </SearchField>
        <SearchField label="상태">
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
