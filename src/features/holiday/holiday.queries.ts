import { useQueries } from "@tanstack/react-query";
import { getHolidays } from "./holiday.api";
import { holidayKeys } from "./holiday.keys";

/** 연도별 공휴일 목록 조회 query */
export function useGetHolidaysQuery(years: number[]) {

  return useQueries({
    queries: years.map((year) => ({
      queryKey: holidayKeys.year(year),
      queryFn: () => getHolidays(year),
      staleTime: 5 * 60_000,
    })),
    combine: (results) => results.flatMap((result) => result.data ?? []),
  });
}
