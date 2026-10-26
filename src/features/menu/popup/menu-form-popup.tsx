"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { FormCell } from "@/components/form/form-cell";
import { FormRow } from "@/components/form/form-row";
import { FormTable } from "@/components/form/form-table";
import { PopupBody, PopupFooter } from "@/components/overlay/popup";
import { Button } from "@/components/ui/button";
import { EnabledSelect } from "@/components/ui/enabled-select";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useCodeOptionsQuery } from "@/lib/code-option/code-option.queries";
import type { CodeOption } from "@/lib/code-option/code-option.type";
import { overlay } from "@/stores/overlay-store";
import { MENU_EMPTY_FORM_VALUES, nextSortOrder, normalizeFormValues } from "../menu.form";
import { useCreateMenuMutation, useUpdateMenuMutation } from "../menu.queries";
import { menuSchema } from "../menu.schema";
import type { AdminMenu, AdminMenuRequest } from "../menu.type";
import { findMenu } from "../menu.util";

type MenuFormPopupProps = {
  menu?: AdminMenu;
  menus: AdminMenu[];
};

type MenuFormPopupBodyProps = MenuFormPopupProps & {
  usgTypes: CodeOption[];
};

/** 메뉴 등록 및 수정 popup */
export function MenuFormPopup({ menu, menus }: MenuFormPopupProps) {

  const { data: usgTypes, isPending } = useCodeOptionsQuery("USG_STATUS");

  if (isPending) return null;

  return (
    <MenuFormPopupBody
      menu={menu}
      menus={menus}
      usgTypes={usgTypes ?? []}
    />
  );
}

/** 메뉴 등록 및 수정 popup 본문 */
function MenuFormPopupBody({
  menu,
  menus,
  usgTypes
}: MenuFormPopupBodyProps) {

  const { mutateAsync: createMenu, isPending: creating } = useCreateMenuMutation();
  const { mutateAsync: updateMenu, isPending: updating } = useUpdateMenuMutation();

  // 메뉴 정렬 순서
  const sortOrderUnder = (parentId?: string | null) =>
    nextSortOrder(parentId ? findMenu(menus, parentId)?.children ?? [] : menus);

  const { register, control, setValue, handleSubmit, formState: { errors } } = useForm<AdminMenuRequest>({
    resolver: zodResolver(menuSchema),
    defaultValues: menu ? structuredClone(menu) : { ...MENU_EMPTY_FORM_VALUES, sortOrder: sortOrderUnder(null) },
  });

  // 선택한 상위 메뉴
  const selectedParentId = useWatch({ control, name: "parentId" });

  // 상위 메뉴 목록
  const parentOptions = menus.filter((item) => item.menuId !== menu?.menuId);

  // 하위 메뉴가 있는 메뉴는 상위 메뉴 변경 불가
  const hasChildren = !!menu?.children.length;

  // 메뉴 저장 및 수정
  const handleSave = async (values: AdminMenuRequest) => {

    const body = normalizeFormValues(values);

    if (menu) await updateMenu({ menuId: menu.menuId, body });
    else await createMenu(body);

    await overlay.alert("저장되었습니다.");
    overlay.close();
  };

  return (
    <form onSubmit={handleSubmit(handleSave)} noValidate className="contents">
      <PopupBody>
        <div className="overflow-hidden rounded-md border border-line">
          <FormTable>
            <FormRow>
              <FormCell label="메뉴 ID" htmlFor="menuId" required error={errors.menuId?.message}>
                <Input
                  id="menuId"
                  readOnly={!!menu}
                  invalid={!!errors.menuId}
                  placeholder="영문 대문자와 밑줄"
                  {...register("menuId")}
                />
              </FormCell>
              <FormCell label="메뉴명" htmlFor="menuName" required error={errors.menuName?.message}>
                <Input id="menuName" invalid={!!errors.menuName} {...register("menuName")} />
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell label="상위 메뉴" htmlFor="parentId" error={errors.parentId?.message}>
                <Select
                  id="parentId"
                  invalid={!!errors.parentId}
                  disabled={hasChildren}
                  {...register("parentId", {
                    // 상위 메뉴 변경 시 정렬 순서 변경
                    onChange: (e) => {
                      const nextParentId = e.target.value || null;
                      setValue("sortOrder", menu && nextParentId === menu.parentId ? menu.sortOrder : sortOrderUnder(nextParentId));
                    },
                  })}
                >
                  <option value="">선택</option>
                  {parentOptions.map((item) => (
                    <option key={item.menuId} value={item.menuId}>{item.menuName}</option>
                  ))}
                </Select>
              </FormCell>
              <FormCell label="정렬" htmlFor="sortOrder" required error={errors.sortOrder?.message}>
                <Input
                  id="sortOrder"
                  type="number"
                  className="w-32"
                  invalid={!!errors.sortOrder}
                  {...register("sortOrder", { valueAsNumber: true })}
                />
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell label="메뉴 경로" htmlFor="menuPath" required={!!selectedParentId} error={errors.menuPath?.message}>
                <Input id="menuPath" invalid={!!errors.menuPath} {...register("menuPath")} />
              </FormCell>
              <FormCell label="사용 여부" htmlFor="enabled" required error={errors.enabled?.message}>
                <EnabledSelect
                  control={control}
                  name="enabled"
                  options={usgTypes}
                  id="enabled"
                  className="w-32"
                  invalid={!!errors.enabled}
                />
              </FormCell>
            </FormRow>
          </FormTable>
        </div>
      </PopupBody>
      <PopupFooter>
        <Button onClick={() => overlay.close()}>취소</Button>
        <Button type="submit" variant="primary-solid" disabled={creating || updating}>저장</Button>
      </PopupFooter>
    </form>
  );
}
