import React from 'react'
import { useRouter, BlitzPage } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import { LoginForm } from 'app/auth/components/LoginForm'
import { Container } from '@chakra-ui/react'
import { PageContainer } from 'app/core/components/PageContainer'

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <PageContainer centerPage>
      <Container>
        <LoginForm onSuccess={() => router.push('/')} />
      </Container>
    </PageContainer>
  )
}

LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
