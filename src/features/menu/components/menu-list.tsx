"use client";

import { useState } from "react";
import { FormSection } from "@/components/form/form-section";
import { Button } from "@/components/ui/button";
import { overlay } from "@/stores/overlay-store";
import { useGetMenusQuery } from "../menu.queries";
import type { AdminMenu } from "../menu.type";
import { findMenu } from "../menu.util";
import { MenuFormPopup } from "../popup/menu-form-popup";
import { MenuTreeTable } from "./menu-tree-table";

/** 메뉴 목록 */
export function MenuList() {

  const { data: menus = [] } = useGetMenusQuery();

  // 선택한 메뉴
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = findMenu(menus, selectedId);

  // 등록 및 수정 팝업
  const openForm = (title: string, menu?: AdminMenu) => {
    overlay.open(
      title,
      <MenuFormPopup menu={menu} menus={menus} onSaveAction={setSelectedId} />,
      { size: "lg" },
    );
  };

  return (
    <FormSection
      title="메뉴 목록"
      actions={<Button variant="primary" onClick={() => openForm("메뉴 등록")}>신규 등록</Button>}
    >
      {/* 조회결과 */}
      <MenuTreeTable
        menus={menus}
        selectedId={selected?.menuId ?? null}
        onSelectAction={(menu) => setSelectedId(menu.menuId)}
        onRowDoubleClickAction={(menu) => openForm("메뉴 수정", menu)}
      />
    </FormSection>
  );
}
