import { Box, Button, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import signup from 'app/auth/mutations/signup'
import { Signup } from 'app/auth/validations'
import { Card } from 'app/core/components/Card'
import { Form, FORM_ERROR } from 'app/core/components/Form'
import { LabeledTextField } from 'app/core/components/LabeledTextField'
import { Link, useMutation } from 'blitz'
import React from 'react'

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <Card>
      <Heading size="lg">Create an Account</Heading>

      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
              // This error comes from Prisma
              return { email: 'This email is already being used' }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>
      <Box
        mt={5}
        textAlign="center"
        borderTop="1px solid"
        borderTopColor={useColorModeValue('gray.100', 'gray.700')}
        pt={5}
      >
        <Text>
          Already have an account?{' '}
          <Link href="/login">
            <Button variant="link" colorScheme="brand">
              Login
            </Button>
          </Link>
        </Text>
      </Box>
    </Card>
  )
}

export default SignupForm
