"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useGetUserQuery } from "../user.queries";
import { toListHref } from "../user.search";
import { UserInfoSection } from "./user-info-section";

type UserDetailProps = {
  userId: string;
};

/** 회원 상세 */
export function UserDetail({ userId }: UserDetailProps) {

  const router = useRouter();
  const listHref = toListHref(useSearchParams());
  const { data, isError } = useGetUserQuery(userId);

  useEffect(() => {
    if (isError) router.replace(listHref);
  }, [isError, listHref, router]);

  if (!data) return null;

  return (
    <div className="flex flex-col gap-4">
      <UserInfoSection user={data} listHref={listHref} />
    </div>
  );
}
