import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useField } from 'react-final-form'
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri'
import { FormBaseControl, FormBaseControlProps } from './FormBaseControl'

export interface FormTextInputProps extends FormBaseControlProps {
  type?: 'text' | 'password' | 'email' | 'number'
  inputProps?: Partial<InputProps>
}

export const FormTextInput = React.forwardRef<HTMLInputElement, FormTextInputProps>(
  ({ name, type, label, inputProps, children, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const {
      input,
      meta: { touched, error, submitError, validating },
    } = useField<string | number>(name, { type, parse: type === 'number' ? Number : undefined })

    return (
      <FormBaseControl
        {...rest}
        name={name}
        label={label}
        isInvalid={submitError || (error && touched)}
      >
        <InputGroup>
          <Input
            {...inputProps}
            {...input}
            type={showPassword ? 'text' : type || 'text'}
            aria-invalid={error}
            aria-describedby={error ? `${input.name}-error` : undefined}
            placeholder={label}
            ref={ref}
          />
          {/* Shows eye icon for text input */}
          {type === 'password' && (
            <InputLeftElement>
              <IconButton
                onClick={() => setShowPassword((x) => !x)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                display="flex"
                size="xs"
                fontSize="lg"
                icon={showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
                variant="unstyled"
              />
            </InputLeftElement>
          )}

          {/* For injecting other child components like: InputLeftAddon etc */}
          {children}

          {/* show spinner when validating */}
          {touched && validating && (
            <InputRightElement>
              <Spinner size="sm" flex="none" />
            </InputRightElement>
          )}
        </InputGroup>
      </FormBaseControl>
    )
  }
)
