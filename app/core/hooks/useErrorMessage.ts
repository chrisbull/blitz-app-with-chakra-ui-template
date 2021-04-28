import { FieldPath, FieldValues, useFormContext } from "react-hook-form"

export const useErrorMessage = <
  T extends FieldValues = FieldValues,
  TName extends FieldPath<T> = FieldPath<T>
>(
  name: TName,
  label?: string
) => {
  const ctx = useFormContext<T>()
  const error = ctx.formState.errors?.[name]

  const errorString = Array.isArray(error)
    ? error.map((err) => err.message).toString()
    : typeof error?.message === "object"
    ? Object.entries(error.message)
        .map(([name, value]) => `[${name}]: ${value}`)
        .toString()
    : error?.message

  return errorString?.replace(name, label || name)
}
