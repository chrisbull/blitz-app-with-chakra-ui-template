import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react"
import { useFormField } from "app/core/hooks/useFormField"
import React from "react"
import { FieldPath, FieldValues } from "react-hook-form"
import { Control, ControlProps } from "./Control"

export interface FormNumberInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends ControlProps<TFieldValues, TName> {
  max?: number
  min?: number
  defaultValue?: number
  preferString?: boolean
}

export const FormNumberInput = ({ preferString, ...props }: FormNumberInputProps) => {
  const { controlProps, inputProps, field } = useFormField(props)

  return (
    <Control {...controlProps}>
      <NumberInput
        {...inputProps}
        {...field}
        onChange={(valueAsString: string, valueAsNumber: number) => {
          const isInvalid = Number.isNaN(valueAsNumber)
          field.onChange(!isInvalid ? valueAsNumber : undefined)
        }}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Control>
  )
}
