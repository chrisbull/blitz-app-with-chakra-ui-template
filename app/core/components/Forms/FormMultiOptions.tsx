/* eslint-disable jsx-a11y/accessible-emoji */
import { Stack } from '@chakra-ui/react'
import React from 'react'
import { FormBaseControl, FormBaseControlProps } from './FormBaseControl'
import { FormCheckboxControl } from './FormCheckbox'

export interface FormMultiOptionsProps extends FormBaseControlProps {
  options: { name: string; value: string }[]
}

export const FormMultiOptions: React.FC<FormMultiOptionsProps> = ({ name, options, ...rest }) => {
  return (
    <FormBaseControl name={name} {...rest}>
      <Stack pl={6} mt={1} spacing={1}>
        {options.map((option, i) => (
          <FormCheckboxControl key={`option-${i}`} name={name} value={option.value}>
            {option.name}
          </FormCheckboxControl>
        ))}
      </Stack>
    </FormBaseControl>
  )
}
