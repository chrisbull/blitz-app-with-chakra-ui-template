import { Select, SelectProps } from "@chakra-ui/react"
import { useFormField } from "app/core/hooks/useFormField"
import React from "react"
import { FieldPath, FieldValues } from "react-hook-form"
import { Control, ControlProps } from "./Control"

export type FormOption = { name: string; value: string | number }

export interface FormSelectInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends ControlProps<TFieldValues, TName>,
    Omit<SelectProps, keyof ControlProps> {
  options: FormOption[]
}

export const FormSelectInput = ({ options, ...props }: FormSelectInputProps) => {
  const { controlProps, field, placeholder, inputProps } = useFormField(props)

  return (
    <Control {...controlProps}>
      <Select {...inputProps} {...field} placeholder={placeholder}>
        {options.map(({ name, value }, i) => (
          <option key={`option-${i}`} value={value}>
            {name}
          </option>
        ))}
      </Select>
    </Control>
  )
}
