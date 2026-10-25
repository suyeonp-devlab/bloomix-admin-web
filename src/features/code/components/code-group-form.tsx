"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { FormCell } from "@/components/form/form-cell";
import { FormRow } from "@/components/form/form-row";
import { FormSection } from "@/components/form/form-section";
import { FormTable } from "@/components/form/form-table";
import { Button } from "@/components/ui/button";
import { EnabledSelect } from "@/components/ui/enabled-select";
import { Input } from "@/components/ui/input";
import { useCodeOptionsQuery } from "@/lib/code-option/code-option.queries";
import type { CodeOption } from "@/lib/code-option/code-option.type";
import { overlay } from "@/stores/overlay-store";
import { CODE_GROUP_EMPTY_FORM_VALUES, normalizeFormValues } from "../code.form";
import { useCreateGroupMutation, useUpdateGroupMutation } from "../code.queries";
import { codeGroupSchema } from "../code.schema";
import { toListHref } from "../code.search";
import type { CommonCodeGroupRequest, CommonCodeGroupResponse } from "../code.type";
import { CodeListEditor } from "./code-list-editor";

type CodeGroupFormProps = {
  group?: CommonCodeGroupResponse;
};

type CodeGroupFormBodyProps = CodeGroupFormProps & {
  usgTypes: CodeOption[];
};

/** 코드 그룹 등록 및 수정 폼 */
export function CodeGroupForm({ group }: CodeGroupFormProps) {

  const { data: usgTypes, isPending } = useCodeOptionsQuery("USG_STATUS");

  if (isPending) return null;

  return <CodeGroupFormBody group={group} usgTypes={usgTypes ?? []} />;
}

/** 코드 그룹 등록 및 수정 폼 본문 */
function CodeGroupFormBody({ group, usgTypes }: CodeGroupFormBodyProps) {

  const router = useRouter();
  const listHref = toListHref(useSearchParams());

  const { mutateAsync: createGroup, isPending: creating } = useCreateGroupMutation();
  const { mutateAsync: updateGroup, isPending: updating } = useUpdateGroupMutation();

  const methods = useForm<CommonCodeGroupRequest>({
    resolver: zodResolver(codeGroupSchema),
    defaultValues: group ? structuredClone(group) : CODE_GROUP_EMPTY_FORM_VALUES
  });

  const { register, control, handleSubmit, formState: { errors } } = methods;

  // 코드 그룹 저장 및 수정
  const handleSave = async (values: CommonCodeGroupRequest) => {

    const body = normalizeFormValues(values);

    if (group) await updateGroup({ groupCode: group.groupCode, body });
    else await createGroup(body);

    await overlay.alert("저장되었습니다.");
    if (!group) router.push(listHref);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSave)} noValidate className="flex flex-col gap-4">
        {/* 공통코드 그룹 */}
        <FormSection title="공통코드 그룹 정보">
          <FormTable>
            <FormRow>
              <FormCell label="그룹코드" htmlFor="groupCode" required error={errors.groupCode?.message}>
                <Input
                  id="groupCode"
                  readOnly={!!group}
                  invalid={!!errors.groupCode}
                  placeholder="영문 대문자와 밑줄"
                  {...register("groupCode")}
                />
              </FormCell>
              <FormCell label="그룹명" htmlFor="groupName" required error={errors.groupName?.message}>
                <Input id="groupName" invalid={!!errors.groupName} {...register("groupName")} />
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
            <FormRow>
              <FormCell label="설명" htmlFor="description" span={5} error={errors.description?.message}>
                <Input id="description" invalid={!!errors.description} {...register("description")} />
              </FormCell>
            </FormRow>
          </FormTable>
        </FormSection>

        {/* 코드 목록 */}
        <CodeListEditor existingCount={group?.codes.length ?? 0} usgTypes={usgTypes} />

        <div className="flex items-center justify-end gap-2">
          <Button onClick={() => router.push(listHref)}>목록</Button>
          <Button type="submit" variant="primary-solid" disabled={creating || updating}>저장</Button>
        </div>
      </form>
    </FormProvider>
  );
}
