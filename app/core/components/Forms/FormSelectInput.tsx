import { Select } from '@chakra-ui/react'
import React from 'react'
import { useField } from 'react-final-form'
import { FormOption } from './types'
import { FormBaseControl, FormBaseControlProps } from './FormBaseControl'

export interface FormSelectInputProps extends FormBaseControlProps {
  options: FormOption[]
}

export const FormSelectInput: React.FC<FormSelectInputProps> = ({ name, options, ...rest }) => {
  const {
    input,
    meta: { touched, error },
  } = useField<string>(name)

  return (
    <FormBaseControl {...rest} name={name} isInvalid={error && touched}>
      <Select {...input}>
        {options.map(({ name, value }, i) => (
          <option key={`option-${i}`} value={value}>
            {name}
          </option>
        ))}
      </Select>
    </FormBaseControl>
  )
}
