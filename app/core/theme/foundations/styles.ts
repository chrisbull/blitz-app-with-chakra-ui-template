export const styles = {
  global: {
    "*:focus, [data-focus]": {
      outline: "none",
      boxShadow: "none",
    },
    html: {
      bg: "gray.800",
    },
    body: {
      bg: "gray.100",
      WebkitTapHighlightColor: "transparent",
    },
    "#chakra-toast-portal > *": {
      pt: "safe-top",
      pl: "safe-left",
      pr: "safe-right",
      pb: "safe-bottom",
    },
  },
}
