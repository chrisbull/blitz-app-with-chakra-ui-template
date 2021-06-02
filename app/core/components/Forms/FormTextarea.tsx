import { Textarea } from "@chakra-ui/react"
import { useFormField } from "app/core/hooks/useFormField"
import React from "react"
import { Control, ControlProps } from "./Control"

export interface FormTextareaProps extends ControlProps {}

export const FormTextarea = (props: FormTextareaProps) => {
  const { controlProps, field, placeholder, inputProps } = useFormField(props)
  return (
    <Control {...controlProps}>
      <Textarea {...field} {...inputProps} placeholder={placeholder} />
    </Control>
  )
}
