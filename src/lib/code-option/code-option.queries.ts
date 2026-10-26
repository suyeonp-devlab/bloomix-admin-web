import { useQuery } from "@tanstack/react-query";
import { getCodeOptions } from "./code-option.api";
import { codeOptionKeys } from "./code-option.keys";
import type { CodeOption } from "./code-option.type";

type UseCodeOptionsConfig = {
  placeholder?: string;
};

/** 셀렉트박스용 공통코드 조회 query */
export function useCodeOptionsQuery(groupCode: string, { placeholder }: UseCodeOptionsConfig = {}) {

  return useQuery({
    queryKey: codeOptionKeys.option(groupCode),
    queryFn: () => getCodeOptions(groupCode),
    select: (codes): CodeOption[] => {
      const options = codes.map((item) => ({ value: item.code, label: item.codeName, etc1: item.etc1 }));
      return placeholder === undefined ? options : [{ value: "", label: placeholder, etc1: null }, ...options];
    },
    staleTime: 5 * 60_000,
  });
}
