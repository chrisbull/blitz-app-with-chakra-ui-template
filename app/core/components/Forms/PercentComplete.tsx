import { Progress, ProgressProps } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm, useFormState } from 'react-final-form'

export interface PercentCompleteProps extends ProgressProps {}
export const PercentComplete: React.FC<PercentCompleteProps> = (props) => {
  const form = useForm()

  const [fields, setFields] = useState<string[]>([])

  useEffect(() => {
    setFields(form.getRegisteredFields())
  }, [form])

  const { errors } = useFormState({ subscription: { errors: true } })

  const numFields = fields.length
  const numErrors = Object.keys(errors).length

  return (
    <Progress
      value={numFields === 0 ? 0 : ((numFields - numErrors) / numFields) * 100}
      {...props}
    />
  )
}
