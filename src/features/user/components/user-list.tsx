"use client";

import { usePathname, useRouter } from "next/navigation";
import { DataTable } from "@/components/data/data-table";
import type { DataTableColumn } from "@/components/data/data-table";
import { Pagination } from "@/components/data/pagination";
import { FormSection } from "@/components/form/form-section";
import { useUrlSearch } from "@/hooks/use-url-search";
import { cn } from "@/lib/utils/cn";
import { formatDateTime } from "@/lib/utils/date";
import { useSearchUsersQuery } from "../user.queries";
import { DEFAULT_SEARCH, parseSearch, serializeSearch } from "../user.search";
import type { User } from "../user.type";
import { UserSearchForm } from "./user-search-form";

/** 회원 목록 */
export function UserList() {

  const router = useRouter();
  const pathname = usePathname();

  const { search, go, move, paramsKey } = useUrlSearch({ parse: parseSearch, serialize: serializeSearch });
  const { data, refetch } = useSearchUsersQuery(search);

  return (
    <div className="flex flex-col gap-4">
      {/* 검색조건 */}
      <UserSearchForm
        key={paramsKey}
        search={search}
        onSearchAction={(condition) => move({ ...condition, page: 1 }, refetch)}
        onResetAction={() => go(DEFAULT_SEARCH, refetch)}
      />

      {/* 조회결과 */}
      <FormSection title="회원 조회결과">
        <DataTable
          columns={COLUMNS}
          rows={data?.content}
          rowKey={(row) => row.userId}
          rowClassName={(row) => row.status === "WITHDRAWN" && "text-fg-muted"}
          onRowDoubleClick={(row) => router.push(`${pathname}/${row.userId}${serializeSearch(search)}`)}
        />
        <Pagination
          page={search.page}
          totalPages={data?.totalPages ?? 0}
          totalElements={data?.totalElements ?? 0}
          size={search.size}
          onPageChange={(page) => move({ page })}
          onSizeChange={(size) => move({ size, page: 1 })}
        />
      </FormSection>
    </div>
  );
}

// 목록 컬럼
const COLUMNS: DataTableColumn<User>[] = [
  { key: "providerName", header: "가입 수단", className: "w-24 text-center" },
  { key: "providerId", header: "계정 ID", className: "w-48" },
  { key: "email", header: "이메일", className: "w-60" },
  { key: "nickname", header: "닉네임" },
  { key: "statusName", header: "상태", className: "w-20 text-center",
    render: (row) => (
      <span className={cn((row.status === "SUSPENDED" || row.status === "LOCKED") && "text-danger")}>{row.statusName}</span>
    ),
  },
  { key: "lastLoginAt", header: "최근 로그인일시", className: "w-36 text-center", render: (row) => formatDateTime(row.lastLoginAt) },
  { key: "joinedAt", header: "가입일시", className: "w-36 text-center", render: (row) => formatDateTime(row.joinedAt) },
];
