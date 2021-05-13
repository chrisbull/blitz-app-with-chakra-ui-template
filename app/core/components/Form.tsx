import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  ButtonProps,
  Icon,
  SlideFade,
  Stack,
} from "@chakra-ui/react"
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { ReactNode, useState } from "react"
import { FormProvider, useForm, UseFormProps } from "react-hook-form"
import { FiAlertCircle } from "react-icons/fi"
import * as z from "zod"

export interface FormProps<S extends z.ZodType<any, any>> extends BoxProps {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  /** Text to display in the submit button when submitting */
  loadingText?: string
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
  initialValues?: UseFormProps<z.infer<S>>["defaultValues"]
  submitButtonProps?: Partial<ButtonProps>
  disableIfNotDirty?: boolean
  showDevTools?: boolean
  showResetButton?: boolean
  resetText?: string
  buttonSize?: ButtonProps["size"]
}

interface OnSubmitResult {
  FORM_ERROR?: string
  [prop: string]: any
}

export const FORM_ERROR = "FORM_ERROR"

const SubmitError = ({ formError }: { formError: string | null }) => {
  return !!formError ? (
    <Box role="alert" color="red.500">
      <SlideFade in offsetY={-6}>
        <Icon as={FiAlertCircle} mr="2" />
        {formError}
      </SlideFade>
    </Box>
  ) : null
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  loadingText = "Submitting",
  submitButtonProps,
  disableIfNotDirty,
  showDevTools,
  showResetButton,
  resetText,
  buttonSize = "lg",
  ...props
}: FormProps<S>) {
  const ctx = useForm<z.infer<S>>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: initialValues,
  })
  const [formError, setFormError] = useState<string | null>(null)

  return (
    <Box>
      {showDevTools && <DevTool placement="bottom-right" control={ctx.control} />}
      <FormProvider {...ctx}>
        <Box
          as="form"
          onSubmit={ctx.handleSubmit(async (values) => {
            const result = (await onSubmit(values)) || {}
            for (const [key, value] of Object.entries(result)) {
              if (key === FORM_ERROR) {
                setFormError(value)
              } else {
                ctx.setError(key as any, {
                  type: "submit",
                  message: value,
                })
              }
            }
          })}
        >
          <Stack spacing={6}>
            {/* Form fields supplied as children are rendered here */}
            {children}

            <SubmitError formError={formError} />

            <ButtonGroup>
              {showResetButton && (
                <Button
                  type="reset"
                  size={buttonSize}
                  onClick={() => {
                    ctx.reset()
                  }}
                >
                  {resetText || "Reset"}
                </Button>
              )}
              {submitText && (
                <Button
                  type="submit"
                  colorScheme="brand"
                  loadingText={loadingText}
                  isLoading={ctx.formState.isSubmitting}
                  isDisabled={
                    ctx.formState.isSubmitting || (disableIfNotDirty && !ctx.formState.isDirty)
                  }
                  size={buttonSize}
                  {...submitButtonProps}
                >
                  {submitText}
                </Button>
              )}
            </ButtonGroup>
          </Stack>
        </Box>
      </FormProvider>
    </Box>
  )
}

export default Form
