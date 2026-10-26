import { PAGE_SIZES } from "@/components/data/pagination";
import { readOneOf, readPositiveInt, readString, toQueryString } from "@/lib/utils/search-query";
import type { CommonCodeGroupListRequest } from "./code.type";

// 공통코드 관리 목록 경로
export const CODE_GROUP_PATH = "/admin/codes";

// 목록 주소 (검색 조건 유지)
export function toListHref(params: { toString(): string }) {
  const query = params.toString();
  return query ? `${CODE_GROUP_PATH}?${query}` : CODE_GROUP_PATH;
}

// default 검색 조건
export const DEFAULT_SEARCH: CommonCodeGroupListRequest = {
  searchType: "",
  keyword: "",
  enabled: "",
  page: 1,
  size: PAGE_SIZES[0],
};

// URL 쿼리 → 검색 조건
export function parseSearch(params: Pick<URLSearchParams, "get">): CommonCodeGroupListRequest {

  return {
    searchType: readString(params, "searchType", DEFAULT_SEARCH.searchType),
    keyword: readString(params, "keyword", DEFAULT_SEARCH.keyword),
    enabled: readOneOf(params, "enabled", ["Y", "N"] as const, ""),
    page: readPositiveInt(params, "page", DEFAULT_SEARCH.page),
    size: readOneOf(params, "size", PAGE_SIZES, DEFAULT_SEARCH.size),
  };
}

// 검색 조건 → URL 쿼리
export function serializeSearch(search: CommonCodeGroupListRequest) {

  return toQueryString({
      searchType: search.searchType,
      keyword: search.keyword,
      enabled: search.enabled,
      page: search.page,
      size: search.size,
    }, DEFAULT_SEARCH);
}
