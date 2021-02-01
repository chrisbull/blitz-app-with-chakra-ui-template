import { FormHelperText, FormLabel } from '@chakra-ui/react'
import React from 'react'
import { ControlProps, FormControlFinal, FormControlFinalProps, FormErrorFinal } from './controls'

export interface FormBaseControlProps extends ControlProps {
  helperText?: string
  containerProps?: Partial<FormControlFinalProps>
}

export const FormBaseControl: React.FC<FormBaseControlProps> = ({
  name,
  label,
  helperText,
  containerProps,
  children,
  ...rest
}) => {
  return (
    <FormControlFinal name={name} {...containerProps} {...rest}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      {children}
      <FormErrorFinal name={name} />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControlFinal>
  )
}
