import { get } from "@/lib/api/client";
import type { CodeOptionResponse } from "./code-option.type";

const BASE = "/api/common-codes";

// 셀렉트박스용 코드 조회
export function getCodeOptions(groupCode: string) {
  return get<CodeOptionResponse[]>(`${BASE}/${encodeURIComponent(groupCode)}`);
}
