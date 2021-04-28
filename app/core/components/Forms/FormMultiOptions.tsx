import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react"
import { useFormField } from "app/core/hooks/useFormField"
import React from "react"
import { Control, ControlProps } from "./Control"

export interface FormMultiOptionsProps extends ControlProps {
  options: { name: string; value: string }[]
}

export const FormMultiOptions = ({ options, ...props }: FormMultiOptionsProps) => {
  const {
    name,
    controlProps,
    field: { ref, ...field },
    inputProps,
  } = useFormField(props)

  return (
    <Control {...controlProps}>
      <CheckboxGroup {...inputProps} {...field}>
        <Stack pl={6} mt={1} spacing={1}>
          {options.map((option, i) => (
            <Checkbox key={`${name}-option-${i}`} {...option}>
              {option.name}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Control>
  )
}
