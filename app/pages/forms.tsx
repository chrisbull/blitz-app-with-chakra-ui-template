import { Container, Heading } from '@chakra-ui/react'
import { Card } from 'app/core/components/Card'
import { ExampleForm } from 'app/core/components/Forms/example/ExampleForm'
import { PageContainer } from 'app/core/components/PageContainer'
import Layout from 'app/core/layouts/Layout'
import { BlitzPage } from 'blitz'
import React from 'react'

interface Props {}

const pageTitle = ''

const FormPage: BlitzPage<Props> = () => {
  return (
    <PageContainer>
      <Container my={5}>
        <Card>
          <Heading size="md">FormPage</Heading>
          <ExampleForm />
        </Card>
      </Container>
    </PageContainer>
  )
}

FormPage.getLayout = (page) => <Layout title={pageTitle}>{page}</Layout>

export default FormPage
