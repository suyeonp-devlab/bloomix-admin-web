import { PAGE_SIZES } from "@/components/data/pagination";
import { readOneOf, readPositiveInt, readString, toQueryString } from "@/lib/utils/search-query";
import type { UserListRequest } from "./user.type";

// 회원 목록 경로
const USER_PATH = "/user/list";

// 목록 주소 (검색 조건 유지)
export function toListHref(params: { toString(): string }) {
  const query = params.toString();
  return query ? `${USER_PATH}?${query}` : USER_PATH;
}

// default 검색 조건
export const DEFAULT_SEARCH: UserListRequest = {
  searchType: "",
  keyword: "",
  provider: "",
  status: "",
  joinedFrom: "",
  joinedTo: "",
  page: 1,
  size: PAGE_SIZES[0],
};

// URL 쿼리 → 검색 조건
export function parseSearch(params: Pick<URLSearchParams, "get">): UserListRequest {

  return {
    searchType: readString(params, "searchType", DEFAULT_SEARCH.searchType),
    keyword: readString(params, "keyword", DEFAULT_SEARCH.keyword),
    provider: readOneOf(params, "provider", ["LOCAL", "GOOGLE", "NAVER"] as const, DEFAULT_SEARCH.provider),
    status: readOneOf(params, "status", ["ACTIVE", "LOCKED", "SUSPENDED", "WITHDRAWN"] as const, DEFAULT_SEARCH.status),
    joinedFrom: readString(params, "joinedFrom", DEFAULT_SEARCH.joinedFrom),
    joinedTo: readString(params, "joinedTo", DEFAULT_SEARCH.joinedTo),
    page: readPositiveInt(params, "page", DEFAULT_SEARCH.page),
    size: readOneOf(params, "size", PAGE_SIZES, DEFAULT_SEARCH.size),
  };
}

// 검색 조건 → URL 쿼리
export function serializeSearch(search: UserListRequest) {

  return toQueryString({
      searchType: search.searchType,
      keyword: search.keyword,
      provider: search.provider,
      status: search.status,
      joinedFrom: search.joinedFrom,
      joinedTo: search.joinedTo,
      page: search.page,
      size: search.size,
    }, DEFAULT_SEARCH);
}
