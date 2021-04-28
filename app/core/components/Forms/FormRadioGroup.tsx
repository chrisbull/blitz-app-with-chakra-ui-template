import { Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { useFormField } from "app/core/hooks/useFormField"
import React from "react"
import { Control, ControlProps } from "./Control"

export interface FormRadioGroupProps extends ControlProps {
  options: { name: string; value: string | number }[]
}

export const FormRadioGroup = ({ options, ...props }: FormRadioGroupProps) => {
  const { controlProps, field, name, inputProps } = useFormField(props)
  return (
    <Control {...controlProps}>
      <RadioGroup {...inputProps} {...field}>
        <Stack direction="row">
          {options.map((option, i) => (
            <Radio key={`option${i}`} id={`${name}-${i}`} {...option}>
              {option.name}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Control>
  )
}
