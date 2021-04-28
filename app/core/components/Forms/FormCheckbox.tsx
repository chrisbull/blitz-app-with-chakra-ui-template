import { Checkbox } from "@chakra-ui/react"
import { useFormField } from "app/core/hooks/useFormField"
import React, { PropsWithChildren } from "react"
import { Control, ControlProps } from "./Control"

export interface FormCheckboxProps extends ControlProps {}

export const FormCheckbox = ({ children, ...props }: PropsWithChildren<FormCheckboxProps>) => {
  const { controlProps, field, inputProps } = useFormField(props)

  return (
    <Control {...controlProps}>
      <Checkbox {...inputProps} {...field}>
        {children}
      </Checkbox>
    </Control>
  )
}
