import { Box, Container, Heading, Text } from "@chakra-ui/layout"
import resetPassword from "app/auth/mutations/resetPassword"
import { ResetPassword } from "app/auth/validations"
import { Card } from "app/core/components/Card"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { FormTextInput } from "app/core/components/Forms/FormTextInput"
import { PageContainer } from "app/core/components/PageContainer"
import { PageTitle } from "app/core/components/PageTitle"
import Layout from "app/core/layouts/Layout"
import { BlitzPage, Link, Routes, useMutation, useRouterQuery } from "blitz"
import React from "react"

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  return (
    <PageContainer centerPage>
      <Container>
        <Card>
          <PageTitle>Set a New Password</PageTitle>

          {isSuccess ? (
            <Box>
              <Heading size="sm" mb={2}>
                Password Reset Successfully
              </Heading>
              <Text>
                Go to the <Link href={Routes.Home()}>homepage</Link>
              </Text>
            </Box>
          ) : (
            <Form
              submitText="Reset Password"
              schema={ResetPassword}
              initialValues={{ password: "", passwordConfirmation: "" }}
              onSubmit={async (values) => {
                try {
                  await resetPasswordMutation({ ...values, token: query.token as string })
                } catch (error) {
                  if (error.name === "ResetPasswordError") {
                    return {
                      [FORM_ERROR]: error.message,
                    }
                  } else {
                    return {
                      [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                    }
                  }
                }
              }}
            >
              <FormTextInput name="password" label="New Password" type="password" />
              <FormTextInput
                name="passwordConfirmation"
                label="Confirm New Password"
                type="password"
              />
            </Form>
          )}
        </Card>
      </Container>
    </PageContainer>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"
ResetPasswordPage.getLayout = (page) => <Layout title="Reset Your Password">{page}</Layout>

export default ResetPasswordPage
