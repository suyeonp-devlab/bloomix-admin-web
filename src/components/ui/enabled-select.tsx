import { Controller } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { ComponentProps } from "react";
import { Select } from "@/components/ui/select";

type EnabledOption = {
  value: string;
  label: string;
};

type EnabledSelectProps<T extends FieldValues> = Omit<ComponentProps<typeof Select>, "value" | "onChange" | "onBlur" | "ref" | "children" | "name"> & {
  control: Control<T>;
  name: FieldPath<T>;
  options: EnabledOption[];
};

/** 공통 사용 여부 select (폼 값 = boolean, select 값 = Y/N) */
export function EnabledSelect<T extends FieldValues>({
  control,
  name,
  options,
  ...props
}: EnabledSelectProps<T>) {

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          {...props}
          ref={field.ref}
          value={field.value ? "Y" : "N"}
          onChange={(e) => field.onChange(e.target.value === "Y")}
          onBlur={field.onBlur}
        >
          {options.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </Select>
      )}
    />
  );
}
