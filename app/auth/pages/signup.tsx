import React from 'react'
import { useRouter, BlitzPage } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import { SignupForm } from 'app/auth/components/SignupForm'
import { Container } from '@chakra-ui/react'
import { PageContainer } from 'app/core/components/PageContainer'

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <PageContainer centerPage>
      <Container>
        <SignupForm onSuccess={() => router.push('/')} />
      </Container>
    </PageContainer>
  )
}

SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
