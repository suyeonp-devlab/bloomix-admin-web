import { X } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { EditTable } from "@/components/data/edit-table";
import type { EditTableColumn } from "@/components/data/edit-table";
import { FormSection } from "@/components/form/form-section";
import { Button } from "@/components/ui/button";
import { EnabledSelect } from "@/components/ui/enabled-select";
import { Input } from "@/components/ui/input";
import type { CodeOption } from "@/lib/code-option/code-option.type";
import { CODE_EMPTY_FORM_VALUES } from "../code.form";
import type { CommonCodeGroupRequest } from "../code.type";

type CodeListEditorProps = {
  existingCount: number;
  usgTypes: CodeOption[];
};

/** 코드 목록 편집 */
export function CodeListEditor({ existingCount, usgTypes }: CodeListEditorProps) {

  const { register, control, getValues, formState: { errors } } = useFormContext<CommonCodeGroupRequest>();
  const { fields, append, remove } = useFieldArray({ control, name: "codes" });

  // 코드 행 추가
  const handleAdd = () => {
    const maxOrder = Math.max(0, ...getValues("codes").map((item) => item.sortOrder || 0));
    append({ ...CODE_EMPTY_FORM_VALUES, sortOrder: maxOrder + 1 });
  };

  // 코드 목록 컬럼
  const columns: EditTableColumn<(typeof fields)[number]>[] = [
    { key: "code", header: "코드", required: true, className: "w-44",
      render: (_, index) =>
        <Input
          aria-label="코드" readOnly={index < existingCount} invalid={!!errors.codes?.[index]?.code}
          {...register(`codes.${index}.code`)}
        />,
    },
    { key: "codeName", header: "코드명", required: true, className: "w-52",
      render: (_, index) =>
        <Input
          aria-label="코드명" invalid={!!errors.codes?.[index]?.codeName}
          {...register(`codes.${index}.codeName`)}
        />,
    },
    { key: "sortOrder", header: "정렬", required: true, className: "w-24",
      render: (_, index) =>
        <Input
          type="number" aria-label="정렬 순서" invalid={!!errors.codes?.[index]?.sortOrder}
          {...register(`codes.${index}.sortOrder`, { valueAsNumber: true })}
        />,
    },
    { key: "enabled", header: "사용 여부", className: "w-32",
      render: (_, index) =>
        <EnabledSelect
          control={control} name={`codes.${index}.enabled`} options={usgTypes} aria-label="코드 사용 여부"
          invalid={!!errors.codes?.[index]?.enabled}
        />,
    },
    { key: "etc1", header: "etc1",
      render: (_, index) =>
        <Input aria-label="etc1" invalid={!!errors.codes?.[index]?.etc1} {...register(`codes.${index}.etc1`)} />,
    },
    { key: "etc2", header: "etc2",
      render: (_, index) =>
        <Input aria-label="etc2" invalid={!!errors.codes?.[index]?.etc2} {...register(`codes.${index}.etc2`)} />,
    },
    { key: "etc3", header: "etc3",
      render: (_, index) =>
        <Input aria-label="etc3" invalid={!!errors.codes?.[index]?.etc3} {...register(`codes.${index}.etc3`)} />,
    },
    { key: "remove", header: "", className: "w-12 text-center",
      render: (_, index) => index >= existingCount && (
        <Button variant="ghost" size="sm" aria-label="행 삭제" onClick={() => remove(index)}>
          <X className="size-3.5" aria-hidden />
        </Button>
      ),
    },
  ];

  const errorMessage = getFirstCodeError(errors.codes);

  return (
    <FormSection
      title={`코드 목록 (${fields.length}건)`}
      actions={<Button variant="primary" onClick={handleAdd}>코드 추가</Button>}
    >
      <EditTable
        columns={columns}
        rows={fields}
        rowKey={(field) => field.id}
        emptyText="등록된 코드가 없습니다."
      />
      {errorMessage && <p role="alert" className="border-t border-line px-4 py-2 text-sm text-danger">{errorMessage}</p>}
    </FormSection>
  );
}

// 코드 행 오류 중 첫 번째 문구
function getFirstCodeError(codes: unknown) {

  if (!Array.isArray(codes)) return null;

  for (const [index, row] of codes.entries()) {
    if (!row) continue;

    const fieldError = Object.values(row as Record<string, { message?: string } | undefined>).find(
      (field) => field?.message,
    );

    if (fieldError?.message) return `${index + 1}행: ${fieldError.message}`;
  }

  return null;
}
