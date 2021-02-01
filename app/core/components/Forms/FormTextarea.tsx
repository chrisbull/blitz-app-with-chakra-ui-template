import { Textarea } from '@chakra-ui/react'
import React from 'react'
import { useField } from 'react-final-form'
import { FormBaseControl, FormBaseControlProps } from './FormBaseControl'

export interface FormTextareaProps extends FormBaseControlProps {}

export const FormTextarea: React.FC<FormTextareaProps> = ({ name, label, ...rest }) => {
  const {
    input,
    meta: { touched, error },
  } = useField(name, { type: 'textarea' })
  return (
    <FormBaseControl {...rest} name={name} label={label} isInvalid={error && touched}>
      <Textarea {...input} placeholder={label} />
    </FormBaseControl>
  )
}
