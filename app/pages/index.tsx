import {
  Box,
  Button,
  Code,
  Container,
  Flex,
  Grid,
  HStack,
  Icon,
  Link as ChakraLink,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import logout from 'app/auth/mutations/logout'
import Logo from 'app/core/components/Logo'
import { useCurrentUser } from 'app/core/hooks/useCurrentUser'
import Layout from 'app/core/layouts/Layout'
import { BlitzPage, Link, useMutation } from 'blitz'
import React, { Suspense } from 'react'
import { FaHeart } from 'react-icons/fa'

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Home: BlitzPage = () => {
  return (
    <Flex minH="100vh">
      <Container>
        <VStack as="main" align="stretch" spacing={5} py={10}>
          <Box>
            <Logo />
          </Box>
          <Text>
            <strong>Congrats!</strong> Your app is ready, including user sign-up and log-in.
          </Text>
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
          <Text fontWeight="bold">
            To add a new model to your app, run the following in your terminal:
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

          <Grid gridAutoFlow={['row', 'row', 'column', 'column']} gridGap={5} my={3}>
            <Link href="https://blitzjs.com/docs/getting-started?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new">
              <Button size="lg" variant="outline">
                Documentation
              </Button>
            </Link>
            <Link href="https://github.com/chrisbull/blitz-app-with-chakra-ui-template">
              <Button size="lg" variant="outline">
                Github Repo
              </Button>
            </Link>
            <Link href="https://discord.blitzjs.com">
              <Button size="lg" variant="outline">
                Discord Community
              </Button>
            </Link>
          </Grid>
        </VStack>
      </Container>
      <Container
        as="footer"
        position="fixed"
        bottom="0"
        maxW="100%"
        p={5}
        bg={useColorModeValue('gray.200', 'gray.900')}
        color={useColorModeValue('gray.700', 'white')}
        centerContent
      >
        <Flex verticalAlign="center" align="center" gridGap={2}>
          <Icon as={FaHeart} color="red.500" />
          <Text>
            Thanks to{' '}
            <Link href="https://blitzjs.com">
              <ChakraLink color="purple.500">BlitzJS</ChakraLink>
            </Link>{' '}
            and{' '}
            <Link href="https://chakra-ui.com/">
              <ChakraLink color="teal.500">ChakraUI</ChakraLink>
            </Link>
          </Text>
        </Flex>
      </Container>
    </Flex>
  )
}

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <VStack align="stretch">
        <HStack spacing={3}>
          <Text>
            User id: <span>{currentUser.id}</span>
          </Text>
          <Text>
            User role: <span>{currentUser.role}</span>
          </Text>
        </HStack>
        <Button
          colorScheme="brand"
          size="md"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </Button>
      </VStack>
    )
  } else {
    return (
      <SimpleGrid columns={2} columnGap={3}>
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
      </SimpleGrid>
    )
  }
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
