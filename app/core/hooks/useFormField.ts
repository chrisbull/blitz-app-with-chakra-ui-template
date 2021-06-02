import { useController, useFormContext } from "react-hook-form"
import { ControlProps, FormFieldProps } from "../components/Forms/Control"

export const useFormField = <T extends FormFieldProps>(props: T) => {
  const {
    control,
    formState: { errors, isValidating },
  } = useFormContext()

  const {
    name,
    defaultValue,
    rules,
    helperText,
    id,
    isDisabled,
    isInvalid,
    isReadOnly,
    isRequired,
    label,
    placeholder,
    ...inputProps
  } = props

  const { field } = useController({ name, defaultValue, control, rules })

  const error = !!errors?.[name]

  const controlProps: ControlProps = {
    name,
    label,
    helperText,
    isDisabled,
    isRequired,
    isReadOnly,
    isInvalid: error || isInvalid,
  }

  return {
    isValidating,
    name,
    placeholder,
    field,
    controlProps,
    inputProps,
  }
}
