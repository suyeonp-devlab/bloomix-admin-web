"use client";

import type { ReactNode } from "react";
import { ErrorState } from "@/components/feedback/error-state";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api/error";
import { LOGIN_REDIRECT_CODES } from "@/lib/api/error-code";
import { LOGIN_PATH } from "@/lib/utils/redirect";
import { useMeQuery } from "../auth.queries";

/** 로그인 인증 가드 (세션 확인 후 화면 표시) */
export function AuthGuard({ children }: { children: ReactNode }) {

  const { isSuccess, isError, error, refetch } = useMeQuery();

  if (isSuccess) return children;

  if (isError) {

    // 로그인 화면 이동 중에는 오류 화면을 그리지 않음
    if (error instanceof ApiError && LOGIN_REDIRECT_CODES.includes(error.code)) return null;

    return (
      <main className="flex min-h-full items-center justify-center px-4 py-10">
        <ErrorState
          header={<span className="text-xl font-bold text-primary-600">Bloomix</span>}
          title="오류가 발생했습니다."
          description="잠시 후 다시 시도해주세요."
          actions={
            <>
              <Button variant="primary-solid" onClick={() => refetch()}>다시 시도</Button>
              <Button onClick={() => window.location.replace(LOGIN_PATH)}>로그인 화면</Button>
            </>
          }
        />
      </main>
    );
  }

  return null;
}
