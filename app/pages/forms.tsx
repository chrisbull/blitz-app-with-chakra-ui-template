import { ChevronLeftIcon } from "@chakra-ui/icons"
import { Box, Button, Container } from "@chakra-ui/react"
import { Card } from "app/core/components/Card"
import Form from "app/core/components/Form"
import { FormCheckbox } from "app/core/components/Forms/FormCheckbox"
import { FormMultiOptions } from "app/core/components/Forms/FormMultiOptions"
import { FormNumberInput } from "app/core/components/Forms/FormNumberInput"
import { FormRadioGroup } from "app/core/components/Forms/FormRadioGroup"
import { FormSelectInput } from "app/core/components/Forms/FormSelectInput"
import { FormTextarea } from "app/core/components/Forms/FormTextarea"
import { FormTextInput } from "app/core/components/Forms/FormTextInput"
import { Link } from "app/core/components/Link"
import { PageContainer } from "app/core/components/PageContainer"
import { PageTitle } from "app/core/components/PageTitle"
import Layout from "app/core/layouts/Layout"
import { stateNameValues } from "app/core/utils/states"
import { BlitzPage, Routes } from "blitz"
import React from "react"
import * as z from "zod"

interface Props {}

const pageTitle = ""

const ingredients = z.enum(["chicken", "ham", "mushrooms", "cheese", "tuna", "pineapple"])

type Ingredients = z.infer<typeof ingredients>

const validation = z.object({
  firstName: z.string(),
  lastName: z.string(),
  employed: z.boolean().refine((isTrue) => isTrue === true, { message: "You must be employeed" }),
  favoriteColor: z.enum(["blue", "red", "green"]),
  toppings: z
    .array(ingredients)
    .min(1, "You must select at lease 1 ingredient")
    .max(3, "You can only select 3 ingredients")
    .refine((arg) => {
      let isValid = true

      let wrongItems: Ingredients[] = ["chicken", "ham"]

      wrongItems.forEach((item) => {
        if (arg.includes(item)) {
          isValid = false
        }
      })

      return isValid
    }, "Ewww, you selected chicken or ham"),
  notes: z.string().min(20),
  count: z.number().min(1).max(10),
  state: z.string().refine((arg) => {
    return !Object.keys(stateNameValues).includes(arg)
  }),
})

export type ValidationType = z.infer<typeof validation>

const FormPage: BlitzPage<Props> = () => {
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const onSubmit = async (values: any) => {
    await sleep(300)
    window.alert(JSON.stringify(values, null, 2))
  }

  return (
    <PageContainer>
      <Container>
        <Box my={5}>
          <Link href={Routes.Home()}>
            <Button leftIcon={<ChevronLeftIcon />} variant="link">
              Home
            </Button>
          </Link>
        </Box>
        <Card>
          <PageTitle>Form Page</PageTitle>
          <Form
            submitText="Submit"
            onSubmit={onSubmit}
            schema={validation}
            initialValues={{ toppings: ["ham", "tuna"] }}
            showDevTools
            showResetButton
          >
            <FormTextInput
              name="firstName"
              label="First Name"
              helperText="Your first name goes here"
            />
            <FormTextInput
              name="lastName"
              label="Last Name"
              helperText="Your last name goes here"
            />
            <FormCheckbox name="employed" label="Employeed?" helperText="Are you employeed?">
              Employed
            </FormCheckbox>

            <FormRadioGroup
              label="Favorite Color"
              name="favoriteColor"
              options={[
                { name: "Red", value: "red" },
                { name: "Green", value: "green" },
                { name: "Blue", value: "blue" },
              ]}
              helperText="What is your favorite color?"
            />

            <FormMultiOptions
              label="Pizza Toppings"
              name="toppings"
              options={[
                { value: "chicken", name: "🐓 Chicken" },
                { value: "ham", name: "🐷 Ham" },
                { value: "mushrooms", name: "🍄 Mushrooms" },
                { value: "cheese", name: "🧀 Cheese" },
                { value: "tuna", name: "🐟 Tuna" },
                { value: "pineapple", name: "🍍 Pineapple" },
              ]}
              helperText="Select some toppings that you love"
            />

            <FormTextarea label="Notes" name="notes" helperText="Leave some killer notes" />
            <FormNumberInput
              label="How many?"
              name="count"
              helperText="How many do you want?"
              min={0}
              max={10}
            />
            <FormSelectInput
              label="State"
              name="state"
              options={stateNameValues}
              placeholder="Select a state"
              helperText="What state do you live in?"
            />
          </Form>
        </Card>
      </Container>
    </PageContainer>
  )
}

FormPage.getLayout = (page) => <Layout title={pageTitle}>{page}</Layout>

export default FormPage
