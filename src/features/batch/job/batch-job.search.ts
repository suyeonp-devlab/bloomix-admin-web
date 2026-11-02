import { PAGE_SIZES } from "@/components/data/pagination";
import { readOneOf, readPositiveInt, readString, toQueryString } from "@/lib/utils/search-query";
import type { BatchJobListRequest } from "./batch-job.type";

// 배치 목록 경로
export const BATCH_JOB_PATH = "/batch/jobs";

// 목록 주소 (검색 조건 유지)
export function toListHref(params: { toString(): string }) {
  const query = params.toString();
  return query ? `${BATCH_JOB_PATH}?${query}` : BATCH_JOB_PATH;
}

// default 검색 조건
export const DEFAULT_SEARCH: BatchJobListRequest = {
  searchType: "",
  keyword: "",
  enabled: "",
  page: 1,
  size: PAGE_SIZES[0],
};

// URL 쿼리 → 검색 조건
export function parseSearch(params: Pick<URLSearchParams, "get">): BatchJobListRequest {

  return {
    searchType: readString(params, "searchType", DEFAULT_SEARCH.searchType),
    keyword: readString(params, "keyword", DEFAULT_SEARCH.keyword),
    enabled: readOneOf(params, "enabled", ["Y", "N"] as const, DEFAULT_SEARCH.enabled),
    page: readPositiveInt(params, "page", DEFAULT_SEARCH.page),
    size: readOneOf(params, "size", PAGE_SIZES, DEFAULT_SEARCH.size),
  };
}

// 검색 조건 → URL 쿼리
export function serializeSearch(search: BatchJobListRequest) {

  return toQueryString({
      searchType: search.searchType,
      keyword: search.keyword,
      enabled: search.enabled,
      page: search.page,
      size: search.size,
    }, DEFAULT_SEARCH);
}
