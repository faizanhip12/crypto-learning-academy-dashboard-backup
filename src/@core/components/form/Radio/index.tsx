import { useId } from 'react'

// ** MUI
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'

// ** Types
import { FormControlLabelProps } from '@mui/material'

// ** form handling lib
import { useController, UseControllerProps } from 'react-hook-form'

interface IField extends UseControllerProps {
  name: string
  label: string
  control: UseControllerProps['control']
  options: { value: FormControlLabelProps['value']; label: FormControlLabelProps['label'] }[]
  questionId?: any
  disabled?: boolean
}

export default function ControlledRadioButtonsGroup({ control, options, ...props }: IField) {
  const labelId = useId()
  const {
    field: { onChange, name, value },
    fieldState: { error }
  } = useController({
    ...props,
    control
  })

  return (
    <FormControl fullWidth>
      <FormLabel id={labelId}>{`${props.label}` || 'Something went wrong!'}</FormLabel>
      <RadioGroup row aria-labelledby={labelId} name={name} value={value} onChange={onChange}>
        {options?.map((option, i) => (
          <FormControlLabel
            key={i}
            value={option.value}
            label={option.label}
            control={<Radio checked={option.value === value} disabled={props.disabled || false} />}
          />
        ))}
      </RadioGroup>
      {error && (
        <FormHelperText sx={{ color: 'error.main' }} id={`validation-schema-${name}`}>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  )
}
