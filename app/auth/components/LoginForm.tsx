import { Checkbox } from "@chakra-ui/checkbox"
import { useColorModeValue } from "@chakra-ui/color-mode"
import { Box, Text } from "@chakra-ui/layout"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { Card } from "app/core/components/Card"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { FormTextInput } from "app/core/components/Forms/FormTextInput"
import { Link } from "app/core/components/Link"
import { PageTitle } from "app/core/components/PageTitle"
import { AuthenticationError, Routes, useMutation } from "blitz"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <Card>
      <PageTitle>Login</PageTitle>

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
        submitButtonProps={{
          size: "lg",
        }}
      >
        <FormTextInput type="email" name="email" label="Email" placeholder="Email" />
        <FormTextInput type="password" name="password" label="Password" placeholder="Password" />
        <Checkbox name="remember">Remember Me</Checkbox>
      </Form>

      <Box mt={5} textAlign="center">
        <Link href={Routes.ForgotPasswordPage()}>Forgot your password?</Link>
      </Box>

      <Box
        mt={5}
        textAlign="center"
        borderTopWidth={1}
        borderTopColor={useColorModeValue("gray.100", "gray.700")}
        pt={5}
      >
        <Text>
          Don't have an account?{" "}
          <Link href={Routes.SignupPage()} colorScheme="brand">
            Sign Up
          </Link>
        </Text>
      </Box>
    </Card>
  )
}

export default LoginForm
