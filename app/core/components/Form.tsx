import { Box, BoxProps, Button, FormErrorMessage, VStack } from '@chakra-ui/react'
import React, { ReactNode, PropsWithoutRef } from 'react'
import { Form as FinalForm, FormProps as FinalFormProps } from 'react-final-form'
import * as z from 'zod'
export { FORM_ERROR } from 'final-form'

type FormProps<S extends z.ZodType<any, any>> = {
  /** All your form fields */
  children: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  loadingText?: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>['onSubmit']
  initialValues?: FinalFormProps<z.infer<S>>['initialValues']
} & Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> &
  BoxProps

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  loadingText = 'Submitting',
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={(values) => {
        if (!schema) return
        try {
          schema.parse(values)
        } catch (error) {
          return error.formErrors.fieldErrors
        }
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <Box as="form" onSubmit={handleSubmit} mt={5} {...props}>
          <VStack align="left" spacing={5}>
            {/* Form fields supplied as children are rendered here */}
            {children}

            {submitError && <FormErrorMessage role="alert">{submitError}</FormErrorMessage>}

            {submitText && (
              <Button
                type="submit"
                disabled={submitting}
                loadingText={loadingText}
                isLoading={submitting}
                colorScheme="brand"
              >
                {submitText}
              </Button>
            )}
          </VStack>
        </Box>
      )}
    />
  )
}

export default Form
