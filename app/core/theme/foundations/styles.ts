export const styles = {
  global: (props) => ({
    '*:focus, [data-focus]': {
      outline: 'none',
      boxShadow: 'none',
    },
    html: {},
    body: {
      WebkitTapHighlightColor: 'transparent',
    },
    '#chakra-toast-portal > *': {
      pt: 'safe-top',
      pl: 'safe-left',
      pr: 'safe-right',
      pb: 'safe-bottom',
    },
  }),
}
