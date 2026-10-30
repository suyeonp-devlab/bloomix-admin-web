"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUrlSearch } from "@/hooks/use-url-search";
import { cn } from "@/lib/utils/cn";
import { addMonths, formatDate } from "@/lib/utils/date";
import { useGetHolidaysQuery } from "../holiday.queries";
import { parseSearch, serializeSearch } from "../holiday.search";
import type { CalendarDay } from "../holiday.type";
import { buildCalendarDays, calendarYears, WEEKDAYS } from "../holiday.util";

type CalendarCellProps = {
  day: CalendarDay;
  holidayName?: string;
  isToday: boolean;
};

/** 공휴일 달력 */
export function HolidayCalendar() {

  const { search, go } = useUrlSearch({ parse: parseSearch, serialize: serializeSearch });

  const days = buildCalendarDays(search);
  const holidays = useGetHolidaysQuery(calendarYears(days));

  const holidayMap = new Map(holidays.map((holiday) => [holiday.holidayDate, holiday.name]));
  const today = formatDate(new Date());

  return (
    <div className="flex flex-col gap-4">
      {/* 월 이동 */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center rounded-md border border-line bg-surface px-4 py-3">
        <div />
        <div className="flex items-center gap-2">
          <Button size="sm" className="h-6 w-6 px-0" aria-label="이전 달" onClick={() => go(addMonths(search.year, search.month, -1))}>
            <ChevronLeft className="size-4" aria-hidden />
          </Button>
          <h2 className="w-22 text-center font-semibold">{search.year}년 {search.month}월</h2>
          <Button size="sm" className="h-6 w-6 px-0" aria-label="다음 달" onClick={() => go(addMonths(search.year, search.month, 1))}>
            <ChevronRight className="size-4" aria-hidden />
          </Button>
        </div>
        <div className="flex items-center justify-end gap-3 text-sm text-fg-secondary">
          <span className="flex items-center gap-1.5"><span className="size-3 rounded-sm border border-danger-line bg-danger-bg" />일요일·공휴일</span>
          <span className="flex items-center gap-1.5"><span className="size-3 rounded-sm border border-info-line bg-info-bg" />토요일</span>
        </div>
      </div>

      {/* 달력 */}
      <div className="overflow-hidden rounded-md border border-line bg-surface">
        <div className="grid grid-cols-7 border-b border-line bg-subtle">
          {WEEKDAYS.map((weekday, index) => (
            <div key={weekday} className={cn("flex h-9 items-center justify-center text-sm font-medium", dayColorClass(index, false))}>
              {weekday}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day) => (
            <CalendarCell
              key={day.date}
              day={day}
              holidayName={holidayMap.get(day.date)}
              isToday={day.date === today}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** 달력 날짜 칸 */
function CalendarCell({ day, holidayName, isToday }: CalendarCellProps) {

  return (
    <div
      className={cn(
        "h-20 border-b border-r border-line px-2 py-1.5 text-sm",
        "nth-[7n]:border-r-0 nth-last-[-n+7]:border-b-0",
        dayBgClass(day.dayOfWeek, !!holidayName, day.inMonth),
      )}
    >
      <div className={cn("flex flex-col gap-1", !day.inMonth && "opacity-40")}>
        <span
          className={cn(
            "flex size-5 items-center justify-center rounded-md",
            isToday ? "bg-fg-secondary font-semibold text-white" : dayColorClass(day.dayOfWeek, !!holidayName),
          )}
        >
          {day.day}
        </span>
        {holidayName && holidayName.split(",").map(name =>
          <span key={name} title={name.trim()} className="truncate text-xs font-medium text-danger">
            {name.trim()}
          </span>
        )}
      </div>
    </div>
  );
}

// 요일에 따른 글자색 className
function dayColorClass(dayOfWeek: number, isHoliday: boolean) {
  if (isHoliday || dayOfWeek === 0) return "text-danger";
  if (dayOfWeek === 6) return "text-info";
  return undefined;
}

// 요일에 따른 배경색 className
function dayBgClass(dayOfWeek: number, isHoliday: boolean, inMonth: boolean) {
  if (isHoliday || dayOfWeek === 0) return inMonth ? "bg-danger-bg" : "bg-danger-bg/40";
  if (dayOfWeek === 6) return inMonth ? "bg-info-bg" : "bg-info-bg/40";
  return undefined;
}
