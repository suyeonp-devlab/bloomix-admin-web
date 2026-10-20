import type { PageResponse } from "@/lib/api/api.type";
import { get, post, put } from "@/lib/api/client";
import type {
  CommonCodeGroupListRequest,
  CommonCodeGroupListResponse,
  CommonCodeGroupRequest,
  CommonCodeGroupResponse,
} from "./code.type";

const BASE = "/api/common-code-groups";

// 코드 그룹 목록 조회
export function searchGroups(params: CommonCodeGroupListRequest) {
  return get<PageResponse<CommonCodeGroupListResponse>>(BASE, { params });
}

// 코드 그룹 상세 조회
export function getGroup(groupCode: string) {
  return get<CommonCodeGroupResponse>(`${BASE}/${encodeURIComponent(groupCode)}`);
}

// 코드 그룹 + 코드 일괄 등록
export function createGroup(body: CommonCodeGroupRequest) {
  return post(BASE, body);
}

// 코드 그룹 + 코드 일괄 수정
export function updateGroup(groupCode: string, body: CommonCodeGroupRequest) {
  return put(`${BASE}/${encodeURIComponent(groupCode)}`, body);
}
