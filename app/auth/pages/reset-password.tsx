import { Container, Heading, Icon, Text, VStack } from '@chakra-ui/react'
import resetPassword from 'app/auth/mutations/resetPassword'
import { ResetPassword } from 'app/auth/validations'
import { Card } from 'app/core/components/Card'
import { Form, FORM_ERROR } from 'app/core/components/Form'
import { LabeledTextField } from 'app/core/components/LabeledTextField'
import { PageContainer } from 'app/core/components/PageContainer'
import Layout from 'app/core/layouts/Layout'
import { BlitzPage, Link, useMutation, useRouterQuery } from 'blitz'
import React from 'react'
import { FcApproval } from 'react-icons/fc'

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  return (
    <PageContainer centerPage>
      <Container>
        <Card>
          <Heading size="md">Set a New Password</Heading>

          {isSuccess ? (
            <VStack spacing={5} mt={5} textAlign="center">
              <Icon as={FcApproval} color="teal.500" w={20} h={20} />
              <Heading size="sm">Password Reset Successfully</Heading>
              <Text>
                Go to the <Link href="/">homepage</Link>
              </Text>
            </VStack>
          ) : (
            <Form
              submitText="Reset Password"
              schema={ResetPassword}
              initialValues={{
                password: '',
                passwordConfirmation: '',
                token: query.token as string,
              }}
              onSubmit={async (values) => {
                try {
                  await resetPasswordMutation(values)
                } catch (error) {
                  if (error.name === 'ResetPasswordError') {
                    return {
                      [FORM_ERROR]: error.message,
                    }
                  } else {
                    return {
                      [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again.',
                    }
                  }
                }
              }}
            >
              <LabeledTextField name="password" label="New Password" type="password" />
              <LabeledTextField
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

ResetPasswordPage.getLayout = (page) => <Layout title="Reset Your Password">{page}</Layout>

export default ResetPasswordPage
