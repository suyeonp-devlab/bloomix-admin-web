"use client";

import { Button } from "@/components/ui/button";
import { useLogoutMutation, useMeQuery } from "@/features/auth/auth.queries";

// 임시 홈 (Header·메뉴 연동 후 정리)
export default function AdminHomePage() {

  const { data } = useMeQuery();
  const { mutateAsync: logout, isPending } = useLogoutMutation();

  return (
    <div className="flex flex-col items-start gap-3 p-6">
      <p>{data?.adminName}님, 로그인되었습니다.</p>
      <Button onClick={() => logout()} disabled={isPending}>
        로그아웃
      </Button>
    </div>
  );
}
