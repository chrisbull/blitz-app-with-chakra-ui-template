import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import login from 'app/auth/mutations/login'
import { Login } from 'app/auth/validations'
import { Form, FORM_ERROR } from 'app/core/components/Forms/Form'
import { LabeledTextField } from 'app/core/components/LabeledTextField'
import { AuthenticationError, Link, useMutation } from 'blitz'
import React from 'react'

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <Flex
      bg={useColorModeValue('gray.100', 'gray.900')}
      minH="100vh"
      justify="center"
      align="center"
    >
      <Container>
        <Box p={10} shadow="md" borderRadius="md" bg={useColorModeValue('white', 'gray.800')}>
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
            <LabeledTextField name="email" label="Email" placeholder="Email" />
            <LabeledTextField
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
            />
            <Checkbox>Remember Me</Checkbox>
            <Box>
              <Link href="/forgot-password">
                <Button variant="link">Forgot your password?</Button>
              </Link>
            </Box>
          </Form>

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
        </Box>
      </Container>
    </Flex>
  )
}

export default LoginForm
