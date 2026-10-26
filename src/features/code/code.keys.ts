import { CODE_QUERY_KEY } from "@/lib/code-option/code-option.keys";
import type { CommonCodeGroupListRequest } from "./code.type";

export const codeKeys = {
  all: CODE_QUERY_KEY,
  lists: () => [...codeKeys.all, "list"] as const,
  list: (params: CommonCodeGroupListRequest) => [...codeKeys.lists(), params] as const,
  detail: (groupCode: string) => [...codeKeys.all, "detail", groupCode] as const,
};
