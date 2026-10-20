import type { CommonCodeGroupListRequest } from "./code.type";

export const codeKeys = {
  all: ["common-code"] as const,
  lists: () => [...codeKeys.all, "list"] as const,
  list: (params: CommonCodeGroupListRequest) => [...codeKeys.lists(), params] as const,
  detail: (groupCode: string) => [...codeKeys.all, "detail", groupCode] as const,
  option: (groupCode: string) => [...codeKeys.all, "option", groupCode] as const,
};
