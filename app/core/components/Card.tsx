import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react"
import React from "react"

export interface CardProps extends BoxProps {}

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <Box
      p={10}
      shadow="md"
      borderRadius="md"
      bg={useColorModeValue("white", "gray.800")}
      my={5}
      {...props}
    >
      {children}
    </Box>
  )
}
