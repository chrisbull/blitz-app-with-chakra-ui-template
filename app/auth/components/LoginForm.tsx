import { Box, Button, Checkbox, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import login from 'app/auth/mutations/login'
import { Login } from 'app/auth/validations'
import { Card } from 'app/core/components/Card'
import { Form, FORM_ERROR } from 'app/core/components/Form'
import { FormTextInput } from 'app/core/components/Forms/FormTextInput'
import { AuthenticationError, Link, useMutation } from 'blitz'
import React from 'react'

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <Card>
      <Heading size="lg">Login</Heading>

      <Form
        submitText="Login"
        schema={Login}
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          try {
            await loginMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: 'Sorry, those credentials are invalid' }
            } else {
              return {
                [FORM_ERROR]:
                  'Sorry, we had an unexpected error. Please try again. - ' + error.toString(),
              }
            }
          }
        }}
      >
        <FormTextInput name="email" label="Email" />
        <FormTextInput name="password" label="Password" type="password" />
        <Checkbox name="remember">Remember Me</Checkbox>
      </Form>

      <Box mt={5} textAlign="center">
        <Link href="/forgot-password">
          <Button variant="link">Forgot your password?</Button>
        </Link>
      </Box>

      <Box
        mt={5}
        textAlign="center"
        borderTop="1px solid"
        borderTopColor={useColorModeValue('gray.100', 'gray.700')}
        pt={5}
      >
        <Text>
          Don't have an account?{' '}
          <Link href="/signup">
            <Button variant="link" colorScheme="brand">
              Sign Up
            </Button>
          </Link>
        </Text>
      </Box>
    </Card>
  )
}

export default LoginForm
