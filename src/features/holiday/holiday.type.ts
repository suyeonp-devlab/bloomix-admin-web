// 공휴일
export type Holiday = {
  holidayDate: string;  // 날짜
  name: string;         // 공휴일명
};

// 달력 생성 조건
export type CalendarSearch = {
  year: number;   // 연도
  month: number;  // 월
};

// 달력 날짜 칸
export type CalendarDay = {
  date: string;         // 날짜
  day: number;          // 일
  dayOfWeek: number;    // 요일 (0 일요일 ~ 6 토요일)
  inMonth: boolean;     // 조회 월의 날짜 여부
};
