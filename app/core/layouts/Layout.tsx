import { ReactNode } from "react"
import { Head } from "blitz"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "blitz-app-with-chakra-ui-template"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>
  )
}

export default Layout
