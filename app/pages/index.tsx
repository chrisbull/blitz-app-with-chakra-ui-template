import React, { Suspense } from 'react'
import { Link, BlitzPage, useMutation } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import { useCurrentUser } from 'app/core/hooks/useCurrentUser'
import logout from 'app/auth/mutations/logout'
import {
  Box,
  Button,
  ButtonGroup,
  Code,
  Container,
  Flex,
  Grid,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import Logo from 'app/core/components/Logo'

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Button
          colorScheme="brand"
          size="sm"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </Button>
        <Box>
          <Text>
            User id: <code p={3}>{currentUser.id}</code>
            <br />
            User role: <code p={3}>{currentUser.role}</code>
          </Text>
        </Box>
      </>
    )
  } else {
    return (
      <>
        <Link href="/signup">
          <Button size="lg" colorScheme="brand">
            Sign Up
          </Button>
        </Link>
        <Link href="/login">
          <Button size="lg" colorScheme="purple">
            Login
          </Button>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <Flex minH="100vh" bg="white">
      <Container>
        <VStack align="stretch" spacing={5} as="main" py={10}>
          <Box>
            <Logo />
          </Box>
          <Text>
            <strong>Congrats!</strong> Your app is ready, including user sign-up and log-in.
          </Text>
          <Grid gridAutoFlow="column" gridGap={5} my={3}>
            <Suspense fallback="Loading...">
              <UserInfo />
            </Suspense>
          </Grid>
          <Text fontWeight="bold">
            To add a new model to your app, <br />
            run the following in your terminal:
          </Text>
          <Code p={3}>blitz generate all project name:string</Code>
          <Code p={3}>blitz prisma migrate dev --preview-feature</Code>

          <Text>
            Then <strong>restart the server</strong>
          </Text>
          <Code p={3}>Ctrl + c</Code>
          <Code p={3}>blitz start</Code>
          <Text>
            and go to{' '}
            <Link href="/projects">
              <Button variant="link">/projects</Button>
            </Link>
          </Text>

          <Grid gridAutoFlow="column" gridGap={5} my={3}>
            <Link href="https://blitzjs.com/docs/getting-started?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new">
              <Button variant="outline">Documentation</Button>
            </Link>
            <Link href="https://github.com/chrisbull/blitz-app-with-chakra-ui-template">
              <Button variant="outline">Github Repo</Button>
            </Link>
            <Link href="https://discord.blitzjs.com">
              <Button variant="outline">Discord Community</Button>
            </Link>
          </Grid>
        </VStack>
      </Container>
      <Flex as="footer" position="fixed" bottom="0" w="100vw" p={5} bg="teal.500" color="brand.200">
        <Container centerContent>
          <HStack>
            <Text>Thanks to</Text>
            <Link href="https://blitzjs.com">
              <Button variant="link" color="white">
                BlitzJS
              </Button>
            </Link>
            <Text>and</Text>
            <Link href="https://chakra-ui.com/">
              <Button variant="link" color="white">
                ChakraUI
              </Button>
            </Link>
          </HStack>
        </Container>
      </Flex>
    </Flex>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
