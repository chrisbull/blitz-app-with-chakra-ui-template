import { Checkbox } from '@chakra-ui/react'
import React from 'react'
import { useField } from 'react-final-form'
import { FormBaseControl, FormBaseControlProps } from './FormBaseControl'

export interface FormCheckboxProps extends FormBaseControlProps {
  value?: string | number
}
export const FormCheckbox: React.FC<FormCheckboxProps> = ({ name, value, children, ...rest }) => {
  return (
    <FormBaseControl name={name} {...rest}>
      <FormCheckboxControl name={name} value={value}>
        {children}
      </FormCheckboxControl>
    </FormBaseControl>
  )
}

export const FormCheckboxControl: React.FC<FormCheckboxProps> = ({ name, value, children }) => {
  const {
    input: { checked, ...input },
    meta: { error, touched },
  } = useField(name, {
    type: 'checkbox', // important for RFF to manage the checked prop
    value, // important for RFF to manage list of strings
  })
  return (
    <Checkbox {...input} isChecked={checked} isInvalid={error && touched}>
      {children}
    </Checkbox>
  )
}
