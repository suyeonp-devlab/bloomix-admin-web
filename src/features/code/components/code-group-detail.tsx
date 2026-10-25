"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useGetGroupQuery } from "../code.queries";
import { toListHref } from "../code.search";
import { CodeGroupForm } from "./code-group-form";

type CodeGroupDetailProps = {
  groupCode: string;
};

/** 코드 그룹 상세 */
export function CodeGroupDetail({ groupCode }: CodeGroupDetailProps) {

  const router = useRouter();
  const listHref = toListHref(useSearchParams());
  const { data, isError, dataUpdatedAt } = useGetGroupQuery(groupCode);

  useEffect(() => {
    if (isError) router.replace(listHref);
  }, [isError, listHref, router]);

  if (!data) return null;

  return <CodeGroupForm key={dataUpdatedAt} group={data} />;
}
