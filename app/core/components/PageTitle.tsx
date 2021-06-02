import { Heading, HeadingProps } from "@chakra-ui/layout"
import React from "react"

export type PageTitleProps = HeadingProps

export const PageTitle: React.FC<PageTitleProps> = (props) => <Heading {...props} />

PageTitle.defaultProps = {
  size: "lg",
  mb: 6,
}

PageTitle.displayName = "PageTitle"
