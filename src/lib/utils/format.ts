// 일시 포맷 (2026-10-12T10:21:03 → 2026-10-12 10:21)
export function formatDateTime(value: string | null | undefined) {
  return value ? value.slice(0, 16).replace("T", " ") : "";
}
