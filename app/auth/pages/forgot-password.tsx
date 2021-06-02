import { Box, Container, Heading, Text } from "@chakra-ui/layout"
import forgotPassword from "app/auth/mutations/forgotPassword"
import { ForgotPassword } from "app/auth/validations"
import { Card } from "app/core/components/Card"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { FormTextInput } from "app/core/components/Forms/FormTextInput"
import { PageContainer } from "app/core/components/PageContainer"
import { PageTitle } from "app/core/components/PageTitle"
import Layout from "app/core/layouts/Layout"
import { BlitzPage, useMutation } from "blitz"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <PageContainer centerPage>
      <Container>
        <Card>
          <PageTitle>Forgot your password?</PageTitle>

          {isSuccess ? (
            <Box>
              <Heading size="sm" mb={2}>
                Request Submitted
              </Heading>
              <Text>
                If your email is in our system, you will receive instructions to reset your password
                shortly.
              </Text>
            </Box>
          ) : (
            <Form
              submitText="Send Reset Password Instructions"
              schema={ForgotPassword}
              initialValues={{ email: "" }}
              onSubmit={async (values) => {
                try {
                  await forgotPasswordMutation(values)
                } catch (error) {
                  return {
                    [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                  }
                }
              }}
            >
              <FormTextInput
                name="email"
                label="Email"
                placeholder="Email"
                isRequired
                type="email"
              />
            </Form>
          )}
        </Card>
      </Container>
    </PageContainer>
  )
}

ForgotPasswordPage.redirectAuthenticatedTo = "/"
ForgotPasswordPage.getLayout = (page) => <Layout title="Forgot Your Password?">{page}</Layout>

export default ForgotPasswordPage
