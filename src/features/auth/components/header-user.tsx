"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogoutMutation, useMeQuery } from "../auth.queries";

/** header 로그인 사용자 정보 영역 */
export function HeaderUser() {

  const { data } = useMeQuery();
  const { mutateAsync: logout, isPending } = useLogoutMutation();

  return (
    <>
      <span className="text-base">
        <span className="font-medium text-primary-600">{data?.adminName}</span>
        <span className="ml-0.5 font-medium">님</span>
      </span>
      <span className="h-4 w-px bg-line" aria-hidden />
      <Button size="sm" onClick={() => logout()} disabled={isPending}>
        <LogOut className="size-3.5" aria-hidden />
        로그아웃
      </Button>
    </>
  );
}
