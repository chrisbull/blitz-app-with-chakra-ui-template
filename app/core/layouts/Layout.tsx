import { NextSeo } from 'next-seo'
import { ReactNode } from 'react'

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <NextSeo title={title} />
      {children}
    </>
  )
}

export default Layout
