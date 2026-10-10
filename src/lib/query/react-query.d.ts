import "@tanstack/react-query";

type RequestMeta = {
  loading?: boolean;   // 전체 로딩 표시 여부 (query 기본 false, mutation 기본 true)
};

declare module "@tanstack/react-query" {
  interface Register {
    queryMeta: RequestMeta;
    mutationMeta: RequestMeta;
  }
}
