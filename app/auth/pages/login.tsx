import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { PageContainer } from "app/core/components/PageContainer"
import { Container } from "@chakra-ui/layout"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <PageContainer centerPage>
      <Container>
        <LoginForm
          onSuccess={() => {
            const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
            router.push(next)
          }}
        />
      </Container>
    </PageContainer>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
