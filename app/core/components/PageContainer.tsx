import { BoxProps, Flex, useColorModeValue } from "@chakra-ui/react"
import React from "react"

export interface PageContainerProps extends BoxProps {
  centerPage?: boolean
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, centerPage, ...props }) => {
  const centerProps = centerPage ? { justify: "center", align: "center" } : {}
  return (
    <Flex bg={useColorModeValue("gray.100", "gray.900")} minH="100vh" {...centerProps} {...props}>
      {children}
    </Flex>
  )
}
