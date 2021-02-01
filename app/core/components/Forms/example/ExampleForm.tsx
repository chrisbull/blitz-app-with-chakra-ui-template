/* eslint-disable jsx-a11y/accessible-emoji */
import { stateNameValues } from 'app/core/utils/states'
import React from 'react'
import { Form } from '../../Form'
import { FormCheckbox } from '../FormCheckbox'
import { FormDebug } from '../FormDebug'
import { FormMultiOptions } from '../FormMultiOptions'
import { FormNumberInput } from '../FormNumberInput'
import { FormRadioGroup } from '../FormRadioGroup'
import { FormSelectInput } from '../FormSelectInput'
import { FormTextarea } from '../FormTextarea'
import { FormTextInput } from '../FormTextInput'
import { PercentComplete } from '../PercentComplete'
import validate from './validate'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const onSubmit = async (values) => {
  await sleep(300)
  window.alert(JSON.stringify(values, null, 2))
}

export const ExampleForm = () => (
  <Form
    submitText="Submit"
    onSubmit={onSubmit}
    schema={validate}
    initialValues={{ toppings: ['ham', 'tuna'] }}
  >
    <FormTextInput name="firstName" label="First Name" helperText="Your first name goes here" />
    <FormTextInput name="lastName" label="Last Name" helperText="Your last name goes here" />
    <FormCheckbox name="employed" label="Employeed?" helperText="Are you employeed?">
      Employed
    </FormCheckbox>

    <FormRadioGroup
      name="favoriteColor"
      options={[
        { name: 'Red', value: '#ff0000' },
        { name: 'Green', value: '#00ff00' },
        { name: 'Blue', value: '#0000ff' },
      ]}
      label="Favorite Color"
      helperText="What is your favorite color?"
    />

    <FormMultiOptions
      name="toppings"
      options={[
        { value: 'chicken', name: '🐓 Chicken' },
        { value: 'ham', name: '🐷 Ham' },
        { value: 'mushrooms', name: '🍄 Mushrooms' },
        { value: 'cheese', name: '🧀 Cheese' },
        { value: 'tuna', name: '🐟 Tuna' },
        { value: 'pineapple', name: '🍍 Pineapple' },
      ]}
      label="Pizza Toppings"
      helperText="Select some toppings that you love"
    />

    <FormTextarea name="notes" label="Notes" helperText="Leave some killer notes" />
    <FormNumberInput
      name="count"
      helperText="How many do you want?"
      // min={0}
      // max={10}
    />
    <FormSelectInput
      name="state"
      options={stateNameValues}
      helperText="What state do you live in?"
    />
    <PercentComplete size="sm" my={5} hasStripe isAnimated />

    <FormDebug />
  </Form>
)
