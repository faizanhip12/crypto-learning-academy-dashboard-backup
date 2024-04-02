import * as React from 'react'
import { Grid, MenuItem } from '@mui/material'
import { useFeedbacks } from 'src/@core/hooks/apps/useFeedback'
import { IFeedback } from 'src/types/apps/feedback'
import { FEEDBACK_TYPES } from '../constant/constants'
import { Select, InputField } from 'src/@core/components/form'
import LoadingButton from '@mui/lab/LoadingButton'

const FeedbackForm = () => {
  // Hooks

  const { addFeedback, form: formMethods, store } = useFeedbacks()

  const onSubmit = async (data: IFeedback) => {
    await addFeedback(data)
  }

  return (
    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} sx={{ padding: 5, mt: 10 }}>
          <InputField
            name='title'
            label='Title (required)'
            placeholder='Title'
            type='text'
            control={formMethods.control}
          />
          <InputField
            sx={{ marginTop: 5, mb: 5 }}
            name='content'
            label='Content'
            placeholder='Tell viewers about your video'
            type='text-area'
            rows={5}
            control={formMethods.control}
          />
          <Grid item xs={12} sm={12}>
            <Select
              name='feedbackType'
              label='Feedback Type'
              placeholder='Milestone Type'
              control={formMethods.control}
            >
              {FEEDBACK_TYPES.map(type => (
                <MenuItem
                  value={type.value}
                  onChange={() => {
                    formMethods.reset({
                      ...formMethods.getValues(),
                      feedbackType: type.value
                    })
                  }}
                >
                  {type.title}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <LoadingButton
            loading={store.status === 'pending'}
            disabled={store.status === 'pending'}
            variant='contained'
            sx={{
              display: 'block',
              margin: 'auto',
              marginTop: 5,
              width: '141px'
            }}
            type='submit'
          >
            Submit
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  )
}

export default FeedbackForm
