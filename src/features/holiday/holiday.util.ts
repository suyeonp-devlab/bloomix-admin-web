import { formatDate } from "@/lib/utils/date";
import type { CalendarDay, HolidayCalendarSearch } from "./holiday.type";

// 요일
export const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

// 달력 칸 수 (6주)
const CALENDAR_DAYS = 42;

// 달력 날짜 목록
export function buildCalendarDays({ year, month }: HolidayCalendarSearch): CalendarDay[] {

  // 1일의 요일 (0 일요일 ~ 6 토요일)
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();

  return Array.from({ length: CALENDAR_DAYS }, (_, index) => {
    const date = new Date(year, month - 1, 1 - firstDayOfWeek + index);
    return {
      date: formatDate(date),
      day: date.getDate(),
      dayOfWeek: date.getDay(),
      inMonth: date.getMonth() === month - 1,
    };
  });
}

// 달력에 보이는 연도 목록
export function calendarYears(days: CalendarDay[]) {
  return [...new Set(days.map((day) => Number(day.date.slice(0, 4))))];
}
