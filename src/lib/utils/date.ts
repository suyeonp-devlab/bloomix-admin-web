// 일시 포맷 (2026-10-12T10:21:03 → 2026-10-12 10:21)
export function formatDateTime(value: string | null | undefined) {
  return value ? value.slice(0, 16).replace("T", " ") : "";
}

// 일자 포맷 (Fri Oct 30 2026 00:00:00 GMT+0900 → 2026-10-30)
export function formatDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

// 연월 이동
export function addMonths(year: number, month: number, amount: number) {
  const date = new Date(year, month - 1 + amount, 1);
  return { year: date.getFullYear(), month: date.getMonth() + 1 };
}
