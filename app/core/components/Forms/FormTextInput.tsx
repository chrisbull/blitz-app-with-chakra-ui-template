import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react"
import { useFormField } from "app/core/hooks/useFormField"
import React, { PropsWithChildren, useState } from "react"
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri"
import { Control, ControlProps } from "./Control"

export interface FormTextInputProps extends ControlProps {
  type?: "text" | "password" | "email" | "number"
}

export const FormTextInput = ({ children, ...props }: PropsWithChildren<FormTextInputProps>) => {
  const { controlProps, field, inputProps, placeholder, isValidating } = useFormField(props)

  const [showPassword, setShowPassword] = useState(false)

  return (
    <Control {...controlProps}>
      <InputGroup {...field}>
        <Input
          {...inputProps}
          type={showPassword ? "text" : inputProps.type || "text"}
          placeholder={placeholder}
        />

        {/* Shows eye icon for text input */}
        {inputProps.type === "password" && (
          <InputLeftElement>
            <IconButton
              aria-label={showPassword ? "Hide Password" : "Show Password"}
              onClick={() => setShowPassword((x) => !x)}
              cursor="pointer"
              icon={showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
              variant="unstyled"
              display="flex"
              justifyContent="center"
              alignItems="center"
            />
          </InputLeftElement>
        )}

        {/* For injecting other child components like: InputLeftAddon etc */}
        {children}

        {/* show spinner when validating */}
        {isValidating && (
          <InputRightElement>
            <Spinner size="sm" flex="none" />
          </InputRightElement>
        )}
      </InputGroup>
    </Control>
  )
}
