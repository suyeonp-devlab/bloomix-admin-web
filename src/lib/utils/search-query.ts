// URL 쿼리에서 값을 읽는 객체
type QueryReader = Pick<URLSearchParams, "get">;

// 쿼리로 만들 값
type QueryValue = string | number | undefined;

// 문자열 읽기
export function readString(params: QueryReader, key: string, fallback: string) {
  return params.get(key) ?? fallback;
}

// 정수 읽기 (1 이상)
export function readPositiveInt(params: QueryReader, key: string, fallback: number) {
  const value = Number(params.get(key));
  return Number.isInteger(value) && value >= 1 ? value : fallback;
}

// 허용된 값 중 하나 읽기
export function readOneOf<T extends string | number, F extends string | number>(
  params: QueryReader,
  key: string,
  allowed: readonly T[],
  fallback: F,
): T | F {

  const raw = params.get(key);
  return allowed.find((item) => String(item) === raw) ?? fallback;
}

// 쿼리 문자열 만들기
export function toQueryString(values: Record<string, QueryValue>, defaults: Record<string, QueryValue> = {}) {

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(values)) {
    // 빈 값, undefined, 기본값과 같은 값은 생략
    if (value === undefined || value === "" || value === defaults[key]) continue;
    params.set(key, String(value));
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}
