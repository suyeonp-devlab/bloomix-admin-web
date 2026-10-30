import { readOneOf, readPositiveInt, toQueryString } from "@/lib/utils/search-query";
import type { HolidayCalendarSearch } from "./holiday.type";

// 월 목록
const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

// default 검색 조건
export function defaultSearch(): HolidayCalendarSearch {
  const today = new Date();
  return { year: today.getFullYear(), month: today.getMonth() + 1 };
}

// URL 쿼리 → 검색 조건
export function parseSearch(params: Pick<URLSearchParams, "get">): HolidayCalendarSearch {

  const defaults = defaultSearch();

  return {
    year: readPositiveInt(params, "year", defaults.year),
    month: readOneOf(params, "month", MONTHS, defaults.month),
  };
}

// 검색 조건 → URL 쿼리
export function serializeSearch(search: HolidayCalendarSearch) {

  return toQueryString({
      year: search.year,
      month: search.month
    }, defaultSearch());
}
