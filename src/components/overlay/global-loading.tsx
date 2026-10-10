"use client";

import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// 로딩 표시 지연 시간 (짧은 요청은 깜빡이지 않도록)
const SHOW_DELAY = 300;

/**
 * 공통 loading
 * - mutation: 기본 표시, query: 기본 미표시
 */
export function GlobalLoading() {

  // 로딩 표시 대상 요청 수
  const fetching = useIsFetching({ predicate: (query) => query.meta?.loading === true });
  const mutating = useIsMutating({ predicate: (mutation) => mutation.options.meta?.loading !== false });

  const active = fetching + mutating > 0;
  const [delayed, setDelayed] = useState(false);

  // 요청이 SHOW_DELAY 이상 이어질 때만 표시
  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => setDelayed(true), SHOW_DELAY);
    return () => {
      clearTimeout(timer);
      setDelayed(false);
    };
  }, [active]);

  if (!active || !delayed) return null;

  return (
    <div role="status" aria-live="polite" className="fixed inset-0 z-60 flex items-center justify-center bg-black/15">
      <span className="size-8 animate-spin rounded-full border-3 border-white/80 border-t-primary-600" />
      <span className="sr-only">처리 중</span>
    </div>
  );
}
