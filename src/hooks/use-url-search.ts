import { usePathname, useRouter, useSearchParams } from "next/navigation";

type UseUrlSearchConfig<T> = {
  parse: (params: Pick<URLSearchParams, "get">) => T;
  serialize: (search: T) => string;
};

/**
 * 목록 검색 조건을 URL 쿼리로 관리
 * - search: 현재 검색 조건
 * - go / move: 조건 이동 (URL 변경)
 * - paramsKey: 검색 폼의 key
 */
export function useUrlSearch<T>({ parse, serialize }: UseUrlSearchConfig<T>) {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = parse(searchParams);

  // 조건 이동 (같은 조건이면 URL이 안 바뀌므로 onSame을 호출)
  const go = (next: T, onSame?: () => void) => {

    const href = `${pathname}${serialize(next)}`;

    if (href === `${pathname}${serialize(search)}`) onSame?.();
    else router.push(href);
  };

  // 현재 조건의 일부만 변경해서 이동
  const move = (condition: Partial<T>, onSame?: () => void) =>
    go({ ...search, ...condition }, onSame);

  return { search, go, move, paramsKey: searchParams.toString() };
}
