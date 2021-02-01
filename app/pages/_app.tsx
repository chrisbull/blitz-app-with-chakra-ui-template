import { ChakraProvider } from '@chakra-ui/react'
import LoginForm from 'app/auth/components/LoginForm'
import { APP_NAME } from 'app/config'
import theme from 'app/core/theme'
import {
  AppProps,
  AuthenticationError,
  AuthorizationError,
  ErrorComponent,
  ErrorFallbackProps,
  Head,
  useRouter,
} from 'blitz'
import { DefaultSeo } from 'next-seo'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { queryCache } from 'react-query'

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()

  return (
    <>
      <DefaultSeo defaultTitle={`${APP_NAME}`} titleTemplate={`%s | ${APP_NAME}`} />
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover, user-scalable=no" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#6236ff" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ChakraProvider theme={theme} resetCSS>
        <ErrorBoundary
          FallbackComponent={RootErrorFallback}
          resetKeys={[router.asPath]}
          onReset={() => {
            // This ensures the Blitz useQuery hooks will automatically refetch
            // data any time you reset the error boundary
            queryCache.resetErrorBoundaries()
          }}
        >
          {getLayout(<Component {...pageProps} />)}
        </ErrorBoundary>
      </ChakraProvider>
    </>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={(error as any).statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
