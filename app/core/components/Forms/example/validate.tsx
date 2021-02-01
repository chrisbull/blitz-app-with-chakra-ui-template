import { stateNameValues } from 'app/core/utils/states'
import * as z from 'zod'

const Validation = z.object({
  firstName: z.string(),
  lastName: z.string(),
  employed: z.boolean(),
  favoriteColor: z.string(),
  toppings: z.array(z.string()),
  notes: z.string(),
  count: z.number().min(1).max(10),
  state: z.string().refine((arg) => {
    console.log(arg)
    return !Object.keys(stateNameValues).includes(arg)
  }),
})

export type ValidationType = z.infer<typeof Validation>

export default Validation
