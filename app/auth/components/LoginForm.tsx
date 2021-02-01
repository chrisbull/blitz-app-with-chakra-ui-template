import React from "react"
import { AuthenticationError, Link, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Forms/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { Box, Button, Checkbox, Container, Flex, Heading, Text, VStack } from "@chakra-ui/react"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <Flex bg="gray.500" minH="100vh" justify="center" align="center">
      <Container>
        <Box p={10} shadow="md" borderRadius="md" bg="white">
          <Heading size="lg">Login</Heading>

          <Form
            submitText="Login"
            schema={Login}
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              try {
                await loginMutation(values)
                props.onSuccess?.()
              } catch (error) {
                if (error instanceof AuthenticationError) {
                  return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
                } else {
                  return {
                    [FORM_ERROR]:
                      "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
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

          <Box mt={5} textAlign="center" borderTop="1px solid" borderTopColor="gray.100" pt={5}>
            <Text>
              Don't have an account?{" "}
              <Link href="/signup">
                <Button variant="link">Sign Up</Button>
              </Link>
            </Text>
          </Box>
        </Box>
      </Container>
    </Flex>
  )
}

export default LoginForm
