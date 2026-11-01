import { PAGE_SIZES } from "@/components/data/pagination";
import { readOneOf, readPositiveInt, readString, toQueryString } from "@/lib/utils/search-query";
import type { BatchHistoryListRequest } from "./batch-history.type";

// default 검색 조건
export const DEFAULT_SEARCH: BatchHistoryListRequest = {
  searchType: "",
  keyword: "",
  status: "",
  triggerType: "",
  startedFrom: "",
  startedTo: "",
  page: 1,
  size: PAGE_SIZES[0],
};

// URL 쿼리 → 검색 조건
export function parseSearch(params: Pick<URLSearchParams, "get">): BatchHistoryListRequest {

  return {
    searchType: readString(params, "searchType", DEFAULT_SEARCH.searchType),
    keyword: readString(params, "keyword", DEFAULT_SEARCH.keyword),
    status: readOneOf(params, "status", ["RUNNING", "COMPLETED", "FAILED"] as const, DEFAULT_SEARCH.status),
    triggerType: readOneOf(params, "triggerType", ["SCHEDULED", "MANUAL", "RESTART"] as const, DEFAULT_SEARCH.triggerType),
    startedFrom: readString(params, "startedFrom", DEFAULT_SEARCH.startedFrom),
    startedTo: readString(params, "startedTo", DEFAULT_SEARCH.startedTo),
    page: readPositiveInt(params, "page", DEFAULT_SEARCH.page),
    size: readOneOf(params, "size", PAGE_SIZES, DEFAULT_SEARCH.size),
  };
}

// 검색 조건 → URL 쿼리
export function serializeSearch(search: BatchHistoryListRequest) {

  return toQueryString({
      searchType: search.searchType,
      keyword: search.keyword,
      status: search.status,
      triggerType: search.triggerType,
      startedFrom: search.startedFrom,
      startedTo: search.startedTo,
      page: search.page,
      size: search.size,
    }, DEFAULT_SEARCH);
}
