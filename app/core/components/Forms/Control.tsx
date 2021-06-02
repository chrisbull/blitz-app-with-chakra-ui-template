import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  SlideFade,
} from "@chakra-ui/react"
import { useErrorMessage } from "app/core/hooks/useErrorMessage"
import React, { PropsWithChildren } from "react"
import { FieldPath, FieldValues, RegisterOptions } from "react-hook-form"
import { FiAlertCircle } from "react-icons/fi"

export interface FormFieldProps<
  T extends FieldValues = FieldValues,
  TName extends FieldPath<T> = FieldPath<T>
> {
  name: TName
  helperText?: string
  id?: string
  isDisabled?: boolean
  isInvalid?: boolean
  isReadOnly?: boolean
  isRequired?: boolean
  label?: string
  defaultValue?: any
  rules?: Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">
  placeholder?: string
}

export interface ControlProps<
  T extends FieldValues = FieldValues,
  TName extends FieldPath<T> = FieldPath<T>
> extends FormFieldProps<T, TName> {
  rules?: Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">
}

export const Control = <T extends FieldValues, TName extends FieldPath<T>>({
  name,
  label,
  helperText,
  children,
  isInvalid,
  ...props
}: PropsWithChildren<ControlProps<T, TName>>) => {
  const error = useErrorMessage<T>(name, label)

  return (
    <FormControl id={name} name={name} isInvalid={isInvalid || !!error} {...props}>
      {/* the label */}
      <FormLabel htmlFor={name}>{label}</FormLabel>

      {/* the input for this field */}
      {children}

      {/* error message at the bottom of the field */}
      <FormErrorMessage>
        <SlideFade in offsetY={-6}>
          <Icon as={FiAlertCircle} mr="2" />
          {error}
        </SlideFade>
      </FormErrorMessage>

      {/* the helper text */}
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}
