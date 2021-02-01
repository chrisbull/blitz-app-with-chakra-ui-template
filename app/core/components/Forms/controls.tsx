import {
  FormControl,
  FormControlOptions,
  FormErrorMessage,
  HTMLChakraProps,
  Icon,
  SlideFade,
  ThemingProps,
} from '@chakra-ui/react'
import React from 'react'
import { useField } from 'react-final-form'
import { FiAlertCircle } from 'react-icons/fi'

export interface ControlProps extends FormControlOptions {
  name: string
  id?: string
  label?: string
}

export interface FormControlFinalProps
  extends ControlProps,
    Omit<HTMLChakraProps<'div'>, 'name'>,
    ThemingProps {
  forceDisabled?: boolean
}

export const FormControlFinal: React.FC<FormControlFinalProps> = ({
  name,
  forceDisabled,
  ...rest
}) => {
  const {
    meta: { error, touched },
  } = useField(name, { subscription: { touched: true, error: true } })
  return (
    <FormControl
      id={name}
      name={name}
      isInvalid={error && touched}
      isDisabled={forceDisabled}
      {...rest}
    />
  )
}

export interface FormErrorFinalProps {
  name: string
}
export const FormErrorFinal = ({ name }: FormErrorFinalProps) => {
  const {
    meta: { error, submitError },
  } = useField(name, {
    subscription: { error: true, submitError: true },
  })

  const normalizedError = Array.isArray(error) ? error.join(', ') : error || submitError

  return (
    <FormErrorMessage>
      <SlideFade in offsetY={-6}>
        <Icon as={FiAlertCircle} mr="2" />
        {normalizedError}
      </SlideFade>
    </FormErrorMessage>
  )
}
