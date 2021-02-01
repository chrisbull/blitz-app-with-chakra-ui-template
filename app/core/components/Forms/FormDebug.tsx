import { Box } from '@chakra-ui/react'
import React from 'react'
import { FormSpy, useFormState } from 'react-final-form'

export function RenderCount() {
  const renders = React.useRef(0)

  return (
    <Box borderRadius="xl" p={5} bg="teal.500" color="white" my={5}>
      Num Render: {++renders.current}
    </Box>
  )
}

export interface FormDebugProps {}

export const FormDebug: React.FC<FormDebugProps> = () => {
  const { values } = useFormState({ subscription: { values: true } })

  return values ? (
    <pre>
      <RenderCount />
      {JSON.stringify(values, null, 2)}
    </pre>
  ) : (
    <FormSpy subscription={{ values: true }}>
      {({ values }) => (
        <pre>
          <RenderCount />
          {JSON.stringify(values, null, 2)}
        </pre>
      )}
    </FormSpy>
  )
}
