import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import React from 'react'
import { useField } from 'react-final-form'
import { FormOption } from './types'
import { FormBaseControl, FormBaseControlProps } from './FormBaseControl'

export interface FormRadioGroupProps extends FormBaseControlProps {
  options: FormOption[]
}

export const FormRadioGroup: React.FC<FormRadioGroupProps> = ({ name, options, ...rest }) => {
  const {
    input,
    meta: { touched, invalid },
  } = useField(name, { type: 'radio' })
  return (
    <FormBaseControl {...rest} name={name} isInvalid={touched && invalid}>
      <RadioGroup {...input}>
        <Stack direction="row">
          {options.map((option, i) => (
            <Radio key={`option${i}`} value={option.value} isInvalid={touched && invalid}>
              {option.name}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </FormBaseControl>
  )
}
