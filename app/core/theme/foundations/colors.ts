import { theme } from "@chakra-ui/react"

import tailwindColors from "./tailwindColors"

export const colors = {
  brand: {
    50: "#e0f4ff",
    100: "#b8dcfa",
    200: "#8ec4f1",
    300: "#63ace8",
    400: "#3994e0",
    500: "#1f7bc6",
    600: "#135f9b",
    700: "#084470",
    800: "#002946",
    900: "#000f1d",
  },
  secondary: {
    50: "#F1EBFF",
    100: "#e0d7ff",
    200: "#c0afff",
    300: "#a186ff",
    400: "#815eff",
    500: "#6236ff",
    600: "#4e2bcc",
    700: "#3b2099",
    800: "#271666",
    900: "#140b33",
  },
  accent: {
    50: "#D1FEFC",
    100: "#ACEFEB",
    200: "#8AE1DC",
    300: "#67D2CC",
    400: "#44C3BC",
    500: "#2EA9A4",
    600: "#228284",
    700: "#175C64",
    800: "#0C3544",
    900: "#021226",
  },
  gray: tailwindColors.blueGray,
  blueGray: tailwindColors.blueGray,
  success: theme.colors.green,
  error: theme.colors.red,
  warning: theme.colors.yellow,
}
