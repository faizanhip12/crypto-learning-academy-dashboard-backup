import React, { Fragment } from 'react'
import { useForm, Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material'
import { InputField, RadioField } from 'src/@core/components/form'
import FieldArray from './FieldArray'

const Assignments = ({ step }: { step: number }) => {
  const {
    control,
    setValue,
    getValues,
    reset,
    register,
    formState: { errors }
  } = useFormContext()
  const { fields, append, remove, prepend, insert } = useFieldArray({
    control,
    name: 'questions'
  })

  const defaultValues = {
    questions: [
      {
        point: '0',
        text: 'useFieldArray1',
        choices: [{ text: '', isCorrect: 'field2' }]
      }
    ]
  }

  return (
    <Fragment key={step}>
      <InputField control={control} name='text' label='Title' required />
      <FieldArray {...{ control, register, defaultValues, getValues, setValue, errors }} />
      <Button type='button' variant='outlined' sx={{ mt: 5 }} onClick={() => reset(defaultValues)}>
        Reset
      </Button>
    </Fragment>
  )
}

export default Assignments
