import { get } from "@/lib/api/client";
import type { HolidayResponse } from "./holiday.type";

const BASE = "/api/holidays";

// 연도별 공휴일 목록 조회
export function getHolidays(year: number) {
  return get<HolidayResponse[]>(BASE, { params: { year } });
}
