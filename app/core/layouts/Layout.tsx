import { useColorMode } from "@chakra-ui/color-mode"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { Box, HStack } from "@chakra-ui/layout"
import { Switch } from "@chakra-ui/switch"
import { NextSeo } from "next-seo"
import { ReactNode } from "react"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <NextSeo title={title} />
      <Box position="fixed" top="20px" right="20px">
        <HStack>
          <SunIcon />
          <Switch isChecked={colorMode === "dark"} onChange={(e) => toggleColorMode()} />
          <MoonIcon />
        </HStack>
      </Box>
      {children}
    </>
  )
}

export default Layout
