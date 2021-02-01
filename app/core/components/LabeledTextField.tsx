import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react'
import React from 'react'
import { useField } from 'react-final-form'

export interface LabeledTextFieldProps extends InputProps {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: 'text' | 'password' | 'email' | 'number'
  outerProps?: FormControlProps
}

export const LabeledTextField = React.forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: props.type === 'number' ? Number : undefined,
    })

    const normalizedError = Array.isArray(error) ? error.join(', ') : error || submitError

    return (
      <FormControl {...outerProps} isInvalid={touched && normalizedError}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <Input id={name} {...input} disabled={submitting} {...props} ref={ref} />
        <FormErrorMessage>{normalizedError}</FormErrorMessage>
      </FormControl>
    )
  }
)

export default LabeledTextField
