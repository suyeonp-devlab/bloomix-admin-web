"use client";

import { usePathname, useRouter } from "next/navigation";
import { DataTable } from "@/components/data/data-table";
import type { DataTableColumn } from "@/components/data/data-table";
import { Pagination } from "@/components/data/pagination";
import { FormSection } from "@/components/form/form-section";
import { Button } from "@/components/ui/button";
import { useUrlSearch } from "@/hooks/use-url-search";
import { formatDateTime } from "@/lib/utils/format";
import { useSearchGroupsQuery } from "../code.queries";
import { DEFAULT_SEARCH, parseSearch, serializeSearch } from "../code.search";
import type { CommonCodeGroupListResponse } from "../code.type";
import { CodeGroupSearchForm } from "./code-group-search-form";

/** 코드 그룹 목록 */
export function CodeGroupList() {

  const router = useRouter();
  const pathname = usePathname();

  const { search, go, move, paramsKey } = useUrlSearch({ parse: parseSearch, serialize: serializeSearch });
  const { data, refetch } = useSearchGroupsQuery(search);

  return (
    <div className="flex flex-col gap-4">
      {/* 검색조건 */}
      <CodeGroupSearchForm
        key={paramsKey}
        search={search}
        onSearchAction={(condition) => move({ ...condition, page: 1 }, refetch)}
        onResetAction={() => go(DEFAULT_SEARCH, refetch)}
      />

      {/* 조회결과 */}
      <FormSection
        title="공통코드 그룹 조회결과"
        actions={<Button variant="primary" onClick={() => router.push(`${pathname}/new`)}>신규 등록</Button>}
      >
        <DataTable
          columns={COLUMNS}
          rows={data?.content}
          rowKey={(row) => row.groupCode}
          onRowDoubleClick={(row) => router.push(`${pathname}/${row.groupCode}`)}
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
const COLUMNS: DataTableColumn<CommonCodeGroupListResponse>[] = [
  { key: "groupCode", header: "그룹코드", className: "w-56" },
  { key: "groupName", header: "그룹명", className: "w-60" },
  { key: "description", header: "설명" },
  { key: "enabled", header: "사용 여부", className: "w-28 text-center",
    render: (row) => row.enabled ? "사용" : "미사용",
  },
  { key: "updatedBy", header: "수정자", className: "w-34 text-center" },
  { key: "updatedAt", header: "수정일시", className: "w-44 text-center", render: (row) => formatDateTime(row.updatedAt) },
];