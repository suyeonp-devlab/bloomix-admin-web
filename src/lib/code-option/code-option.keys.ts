export const CODE_QUERY_KEY = ["common-code"] as const;

export const codeOptionKeys = {
  option: (groupCode: string) => [...CODE_QUERY_KEY, "option", groupCode] as const,
};
