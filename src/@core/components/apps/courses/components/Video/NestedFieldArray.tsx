import { Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { ReactNode, useId } from 'react'
import { InputField, RadioField } from 'src/@core/components/form'
import { Controller, useController, useFieldArray } from 'react-hook-form'
import ControlledRadioButtonsGroup from 'src/@core/components/form/Radio'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

export default ({ nestIndex, control, register }: any) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `questions.${nestIndex}.choices`
  })

  const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    const {
      field: { onChange, onBlur, name, value, ref },
      fieldState: { invalid, isTouched, isDirty, error },
      formState: { touchedFields, dirtyFields }
    } = useController({
      control,
      name: `questions.${nestIndex}.isCorect`
    })

    const labelId = useId()
    return (
      <FormControl fullWidth>
        <RadioGroup row aria-labelledby={labelId} name={name} value={value} onChange={onChange}>
          {children}
        </RadioGroup>
        {error && (
          <FormHelperText sx={{ color: 'error.main' }} id={`validation-schema-${name}`}>
            {error.message}
          </FormHelperText>
        )}
      </FormControl>
    )
  }

  return (
    <div>
      <Wrapper>
        {fields.map((item, k) => {
          return (
            <div
              key={item.id}
              style={{
                marginLeft: 0,
                display: 'flex',
                marginBottom: '15px',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: '60%'
                }}
              >
                <FormControlLabel style={{ marginRight: '10px' }} value={k} control={<Radio />} label='' />
                {/* <label>Nested Array:</label> */}
                <InputField name={`questions.${nestIndex}.choices.${k}.text`} required control={control} fullWidth />
                {/* <input
                {...register(`questions.${nestIndex}.choices.${k}.text`, {
                  required: true
                })}
                style={{ marginRight: '25px' }}
              /> */}
              </div>
              {/* <ControlledRadioButtonsGroup
                            name="gender"
                            label="Gender"
                            control={control}
                            options={[
                                { value: 'male', label: 'Male' },
                                // { value: 'female', label: 'Female' },
                            ]}
                        /> */}
              {/* <label>Nested Array:</label> */}
              {/* <input {...register(`questions.${nestIndex}.choices.${k}.isCorrect`)} /> */}
              {/* <Button type='button' variant='outlined' onClick={() => remove(k)} sx={{ mt: 5 }}> */}
              <ArrowDropUpIcon />
              <ArrowDropDownIcon />
              <DeleteIcon onClick={() => remove(k)} cursor={'pointer'} />
              {/* </Button> */}
            </div>
          )
        })}
      </Wrapper>
      {/* <Button
        color='success'
        variant='outlined'
        type='button'
        
      > */}
      <div
        style={{
          textAlign: 'left'
        }}
      >
        <AddCircleIcon
          cursor={'pointer'}
          onClick={() =>
            append({
              text: '',
              isCorrect: 'field2'
            })
          }
        />
      </div>
      {/* </Button> */}

      <hr />
    </div>
  )
}
