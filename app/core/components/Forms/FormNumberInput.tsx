import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'
import React from 'react'
import { useField } from 'react-final-form'
import { FormBaseControl, FormBaseControlProps } from './FormBaseControl'

export interface FormNumberInputProps extends FormBaseControlProps {
  max?: number
  min?: number
  defaultValue?: number
}

export const FormNumberInput = ({
  name,
  label,
  max,
  min,
  defaultValue,
  ...rest
}: FormNumberInputProps) => {
  const {
    input,
    meta: { touched, error },
  } = useField(name, { type: 'number', parse: Number, defaultValue })

  return (
    <FormBaseControl {...rest} name={name} label={label} isInvalid={error && touched}>
      <NumberInput
        {...input}
        name={name}
        max={max}
        min={min}
        isInvalid={error && touched}
        aria-invalid={error}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormBaseControl>
  )
}
