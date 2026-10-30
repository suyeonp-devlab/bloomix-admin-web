export const holidayKeys = {
  all: ["holiday"] as const,
  year: (year: number) => [...holidayKeys.all, "year", year] as const,
};
