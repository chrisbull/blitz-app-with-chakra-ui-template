import React from "react"
import { Link, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Forms/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <Flex bg="gray.500" minH="100vh" justify="center" align="center">
      <Container>
        <Box p={10} shadow="md" borderRadius="md" bg="white">
          <Heading size="lg">Create an Account</Heading>

          <Form
            submitText="Create Account"
            schema={Signup}
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              try {
                await signupMutation(values)
                props.onSuccess?.()
              } catch (error) {
                if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                  // This error comes from Prisma
                  return { email: "This email is already being used" }
                } else {
                  return { [FORM_ERROR]: error.toString() }
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
          </Form>
          <Box mt={5} textAlign="center" borderTop="1px solid" borderTopColor="gray.100" pt={5}>
            <Text>
              Already have an account?{" "}
              <Link href="/login">
                <Button variant="link">Login</Button>
              </Link>
            </Text>
          </Box>
        </Box>
      </Container>
    </Flex>
  )
}

export default SignupForm
