"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useMeQuery } from "../auth.queries";

type GuestGuardProps = {
  redirectTo: string;   // 로그인 상태일 때 이동 경로
  children: ReactNode;
};

/** 비로그인 전용 가드 */
export function GuestGuard({ redirectTo, children }: GuestGuardProps) {

  const router = useRouter();
  const { isPending, isSuccess } = useMeQuery({ showError: false, loading: false });

  useEffect(() => {
    if (isSuccess) router.replace(redirectTo);
  }, [isSuccess, redirectTo, router]);

  if (isPending || isSuccess) return null;

  return children;
}
