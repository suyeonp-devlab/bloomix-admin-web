"use client";

import { ChevronRight, Folder, FolderOpen } from "lucide-react";
import { useState } from "react";
import { DataTable } from "@/components/data/data-table";
import type { DataTableColumn } from "@/components/data/data-table";
import { cn } from "@/lib/utils/cn";
import { formatDateTime } from "@/lib/utils/format";
import type { AdminMenu } from "../menu.type";

type MenuTreeTableProps = {
  menus: AdminMenu[];
  selectedId: string | null;
  onSelectAction: (menu: AdminMenu) => void;
  onRowDoubleClickAction: (menu: AdminMenu) => void;
};

/** 메뉴 트리 표 */
export function MenuTreeTable({
  menus,
  selectedId,
  onSelectAction,
  onRowDoubleClickAction,
}: MenuTreeTableProps) {

  // 접힌 메뉴 ID
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  // 펼쳐진 트리 순서의 행
  const rows = menus.flatMap((menu) => collapsed[menu.menuId] ? [menu] : [menu, ...menu.children]);

  // 메뉴명 렌더링
  const renderName = (menu: AdminMenu) => {

    // 하위 메뉴
    if (menu.parentId) {
      return <span className="pl-6">{menu.menuName}</span>;
    }

    const hasChildren = menu.children.length > 0;
    const open = hasChildren && !collapsed[menu.menuId];
    const FolderIcon = open ? FolderOpen : Folder;

    return (
      <div className="flex items-center gap-1">
        {hasChildren ? (
          <button
            type="button"
            aria-label={`${menu.menuName} ${open ? "접기" : "펼치기"}`}
            aria-expanded={open}
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed((prev) => ({ ...prev, [menu.menuId]: open }));
            }}
            onDoubleClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            className="flex size-5 shrink-0 items-center justify-center rounded-sm text-fg-muted hover:bg-line"
          >
            <ChevronRight className={cn("size-3.5 transition-transform", open && "rotate-90")} aria-hidden />
          </button>
        ) : (
          <span className="size-5 shrink-0" aria-hidden />
        )}
        {!menu.menuPath && <FolderIcon className="size-4 shrink-0 text-fg-muted" aria-hidden />}
        <span className="truncate font-medium">{menu.menuName}</span>
      </div>
    );
  };

  // 메뉴 컬럼
  const columns: DataTableColumn<AdminMenu>[] = [
    { key: "menuName", header: "메뉴명", render: renderName },
    { key: "menuId", header: "메뉴 ID", className: "w-56" },
    { key: "menuPath", header: "메뉴 경로", className: "w-80" },
    { key: "sortOrder", header: "정렬", className: "w-20 text-center" },
    { key: "enabled", header: "사용 여부", className: "w-28 text-center",
      render: (row) => row.enabled ? "사용" : "미사용",
    },
    { key: "updatedAt", header: "수정일시", className: "w-44 text-center", render: (row) => formatDateTime(row.updatedAt) },
  ];

  return (
    <DataTable
      columns={columns}
      rows={rows}
      rowKey={(row) => row.menuId}
      rowClassName={(row) => !row.enabled && "text-fg-muted"}
      selectedRowKey={selectedId}
      onRowSelect={onSelectAction}
      onRowDoubleClick={onRowDoubleClickAction}
      emptyText="등록된 메뉴가 없습니다."
    />
  );
}
