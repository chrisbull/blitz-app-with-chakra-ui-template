import { extendTheme, ThemeOverride } from "@chakra-ui/react"
import Badge from "./components/badge"
import Button from "./components/button"
import Container from "./components/container"
import Input from "./components/input"
import Textarea from "./components/textarea"
import NumberInput from "./components/number"
import Select from "./components/select"
import { colors } from "./foundations/colors"
import { fonts } from "./foundations/fonts"
import { fontSizes } from "./foundations/fontSizes"
import { shadows } from "./foundations/shadows"
import { sizes } from "./foundations/sizes"
import { spacing } from "./foundations/spacing"
import { styles } from "./foundations/styles"

const extendThemeObj: ThemeOverride = {
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
  },
  fonts,
  styles,
  colors,
  shadows,
  space: spacing,
  sizes,
  fontSizes,
  components: { Badge, Input, Container, Button, Textarea, Select, NumberInput },
}

export type ExtendedTheme = typeof extendThemeObj

export default extendTheme(extendThemeObj)
