import {
  Box,
  Button,
  Code,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Link as ChakraLink,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import logout from "app/auth/mutations/logout"
import { APP_NAME } from "app/config"
import Logo from "app/core/components/Logo"
import { PageContainer } from "app/core/components/PageContainer"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Layout from "app/core/layouts/Layout"
import { BlitzPage, Link, Routes, useMutation } from "blitz"
import React, { Suspense } from "react"
import { FaHeart } from "react-icons/fa"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

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
        <Link href={Routes.SignupPage()}>
          <Button size="lg" colorScheme="brand">
            Sign Up
          </Button>
        </Link>

        <Link href={Routes.LoginPage()}>
          <Button size="lg" colorScheme="purple">
            Login
          </Button>
        </Link>
      </SimpleGrid>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <PageContainer>
      <Container>
        <VStack as="main" align="stretch" spacing={5} py={10}>
          <Box>
            <Logo />
          </Box>
          <Heading>Welcome to {APP_NAME}</Heading>
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

          <Box mb={1}>(And select Yes to run prisma migrate)</Box>

          <Text>
            Then <strong>restart the server</strong>
          </Text>
          <Code p={3}>Ctrl + c</Code>
          <Code p={3}>blitz dev</Code>
          <Text>
            and go to{" "}
            <Link href="/projects">
              <ChakraLink>/projects</ChakraLink>
            </Link>
          </Text>

          <Divider />

          <Heading size="sm">Form Example</Heading>
          <Box>
            <Text>
              Make sure to visit the form page{" "}
              <Link href="/forms">
                <ChakraLink>/forms</ChakraLink>
              </Link>
            </Text>
          </Box>

          <Grid gridAutoFlow={["row", "row", "column", "column"]} gridGap={5} my={3}>
            <Link href="https://blitzjs.com/docs/getting-started?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new">
              <Button size="sm" variant="outline">
                Documentation
              </Button>
            </Link>
            <Link href="https://github.com/chrisbull/blitz-app-with-chakra-ui-template">
              <Button size="sm" variant="outline">
                Github Repo
              </Button>
            </Link>
            <Link href="https://discord.blitzjs.com">
              <Button size="sm" variant="outline">
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
        bg={useColorModeValue("gray.200", "gray.900")}
        color={useColorModeValue("gray.700", "white")}
        centerContent
      >
        <Flex verticalAlign="center" align="center" gridGap={2}>
          <Icon as={FaHeart} color="red.500" />
          <Text>
            Thanks to{" "}
            <Link href="https://blitzjs.com">
              <ChakraLink color="purple.500">BlitzJS</ChakraLink>
            </Link>{" "}
            and{" "}
            <Link href="https://chakra-ui.com/">
              <ChakraLink color="teal.500">ChakraUI</ChakraLink>
            </Link>
          </Text>
        </Flex>
      </Container>
    </PageContainer>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
