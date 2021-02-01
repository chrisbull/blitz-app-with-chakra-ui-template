import { extendTheme, ThemeOverride } from "@chakra-ui/react"
import Badge from "./components/badge"
import Button from "./components/button"
import Container from "./components/container"
import Input from "./components/input"
import { colors } from "./foundations/colors"
import { fonts } from "./foundations/fonts"
import { fontSizes } from "./foundations/fontSizes"
import { shadows } from "./foundations/shadows"
import { sizes } from "./foundations/sizes"
import { spacing } from "./foundations/spacing"
import { styles } from "./foundations/styles"

const extendThemeObj: ThemeOverride = {
  fonts,
  styles,
  colors,
  shadows,
  space: spacing,
  sizes,
  fontSizes,
  components: { Badge, Input, Container, Button },
}

export type ExtendedTheme = typeof extendThemeObj

export default extendTheme(extendThemeObj)
