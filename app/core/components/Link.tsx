import React from "react"
import { Link as BlitzLink, LinkProps as BlitzLinkProps } from "blitz"
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from "@chakra-ui/react"

interface LinkProps extends BlitzLinkProps, Omit<ChakraLinkProps, keyof BlitzLinkProps> {}

export const Link: React.FC<LinkProps> = ({
  children,
  href,
  as,
  locale,
  passHref,
  prefetch,
  replace,
  scroll,
  shallow,
  ...props
}) => (
  <BlitzLink {...{ href, as, locale, passHref, prefetch, replace, scroll, shallow }}>
    <ChakraLink {...props}>{children}</ChakraLink>
  </BlitzLink>
)
