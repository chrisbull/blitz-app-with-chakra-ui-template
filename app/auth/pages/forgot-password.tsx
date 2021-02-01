import { Container, Heading, Icon, Text, VStack } from '@chakra-ui/react'
import forgotPassword from 'app/auth/mutations/forgotPassword'
import { ForgotPassword } from 'app/auth/validations'
import { Card } from 'app/core/components/Card'
import { Form, FORM_ERROR } from 'app/core/components/Form'
import { FormTextInput } from 'app/core/components/Forms/FormTextInput'
import { PageContainer } from 'app/core/components/PageContainer'
import Layout from 'app/core/layouts/Layout'
import { BlitzPage, useMutation } from 'blitz'
import React from 'react'
import { BiMailSend } from 'react-icons/bi'

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <PageContainer centerPage>
      <Container>
        <Card>
          <Heading size="md">Forgot your password?</Heading>

          {isSuccess ? (
            <VStack spacing={5} mt={5} textAlign="center">
              <Icon as={BiMailSend} color="teal.500" w={20} h={20} />
              <Heading size="sm">Request Submitted</Heading>
              <Text>
                If your email is in our system, you will receive instructions to reset your password
                shortly.
              </Text>
            </VStack>
          ) : (
            <Form
              submitText="Send Reset Password Instructions"
              schema={ForgotPassword}
              initialValues={{ email: '' }}
              onSubmit={async (values) => {
                try {
                  await forgotPasswordMutation(values)
                } catch (error) {
                  return {
                    [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again.',
                  }
                }
              }}
            >
              <FormTextInput name="email" label="Email" />
            </Form>
          )}
        </Card>
      </Container>
    </PageContainer>
  )
}

ForgotPasswordPage.getLayout = (page) => <Layout title="Forgot Your Password?">{page}</Layout>

export default ForgotPasswordPage
