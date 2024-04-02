import React, { useEffect, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import NestedArray from './NestedFieldArray'
import { Box, Button, List, Typography } from '@mui/material'
import { InputField } from 'src/@core/components/form'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import dynamic from 'next/dynamic'

const CKeditor = dynamic(() => import('src/@core/components/apps/courses/components/ckeditor'), {
  ssr: false // Set ssr to false to avoid server-side rendering for this component
})
let renderCount = 0

export default function Fields({ control, register, setValue, getValues }: any) {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: 'questions'
  })

  renderCount++

  const [editorLoaded, setEditorLoaded] = useState<boolean>(false)
  // const {question, setQuestion} = useState('');

  useEffect(() => {
    setEditorLoaded(true)
  }, [])

  // useEffect(() => {
  //   setValue('questions', question)
  // }, [question, setValue])

  return (
    <>
      <ul
        style={{
          paddingLeft: '0',
          marginBottom: '20px',
          marginTop: '20px'
        }}
      >
        {fields.map((item, index) => {
          return (
            <List key={item.id}>
              <Typography variant='h6'>Question {index + 1}</Typography>
              <div>
                <CKeditor
                  name={`questions.${index}.name`}
                  setValue={setValue}
                  index={index}
                  value={''}
                  editorLoaded={editorLoaded}
                />
              </div>
              {/* <InputField name={`questions.${index}.name`} control={control} /> */}
              <Typography variant='h6' textAlign='left' marginBottom='15px'>
                Point
              </Typography>
              <InputField name={`questions.${index}.point`} type='number' control={control} required />
              {/* <input {...register(`questions.${index}.name`)} /> */}

              <Button
                type='button'
                onClick={() => remove(index)}
                variant='outlined'
                endIcon={<DeleteIcon />}
                color='error'
                sx={{ mt: 5 }}
              >
                Delete Question
              </Button>
              <NestedArray nestIndex={index} {...{ control, register }} />
            </List>
          )
        })}
      </ul>
      <section>
        <Button
          type='button'
          color='primary'
          variant='contained'
          startIcon={<AddCircleIcon />}
          onClick={() => {
            append({ name: '' })
          }}
        >
          Add Question
        </Button>
      </section>
    </>
  )
}
