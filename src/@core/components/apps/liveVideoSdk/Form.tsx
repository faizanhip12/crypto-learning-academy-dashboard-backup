import * as React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useCourses } from 'src/@core/hooks/apps/useCourses'
import { Card, CardProps, FormHelperText, Grid } from '@mui/material'
import { InputField } from '../../form'
import FileUploaderRestrictions from './FileUploader'
import PlayListSingleSelect from '../courses/components/Video/SelectPlaylist'
import { useTheme } from '@mui/material/styles'
import { useVideo } from 'src/@core/hooks/apps/useVideo'

const inputStyle = {
  font: 'inherit',
  border: '1px solid #424247',
  borderRadius: '8px',
  background: 'none',
  height: '1.4375em',
  margin: '1.25rem 0',
  display: 'block',
  width: '100%',
  padding: '26px 14px',
  fontFamily: 'Inter,sans-serif,-apple-system,BlinkMacSystemFont',
  fontWeight: '400',
  fontSize: '1rem',
  lineHeight: '1.4375em',
  letterSpacing: '0.15px',
  color: 'rgba(234, 234, 255, 0.87)',
  colorScheme: 'dark'
}

const Header = styled(Card)<CardProps>(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: spacing(5, 10),
  justifyContent: 'space-between',
  borderBottom: 1
}))

const GoLiveForm = () => {
  const {
    form: {
      control,
      handleSubmit,
      getValues,
      setValue,
      formState: { errors },
      reset
    },
    store
  } = useCourses(null)

  const { createLiveVideoEvent } = useVideo(null)

  const [startAt, setStartAt] = React.useState('')

  const {
    palette: {
      error: { main },
      customColors: { themeColor }
    }
  } = useTheme()

  const onSubmit = async (data: any) => {
    delete data.subtitles
    delete data.assignment
    delete data.fileId
    delete data.visibility
    data.startAt = new Date(startAt)

    const { statusCode } = await createLiveVideoEvent(data)

    if (statusCode === '10000') {
      reset()
      setValue('playlistId', '')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Header>
        <Typography variant='h6'>{'Schedule Live Streaming'}</Typography>
        <LoadingButton
          loading={store.status === 'pending'}
          disabled={store.status === 'pending'}
          sx={{
            display: 'block',
            // margin: 'auto',
            width: '141px'
          }}
          type='submit'
          variant='contained'
          color='primary'
        >
          Create
        </LoadingButton>
      </Header>
      <Grid container>
        <Grid item xs={12} sx={{ padding: 5, mt: 10 }}>
          <InputField
            name='title'
            label='Title (required)'
            placeholder='Title'
            rows={3}
            type='text-area'
            control={control}
          />
          <InputField
            sx={{ marginTop: 5, mb: 5 }}
            name='description'
            label='Description'
            placeholder='Tell viewers about your video'
            type='text-area'
            rows={5}
            control={control}
          />
          <PlayListSingleSelect
            execute={true}
            playlist={getValues('playlistId')}
            setPlaylist={e => setValue('playlistId', e?.id as string)}
          />
          <input
            style={inputStyle}
            type='datetime-local'
            id='birthdaytime'
            name='birthdaytime'
            onChange={e => {
              setStartAt(e.target.value)
            }}
            required
          />
        </Grid>
        <Grid sx={{ padding: 5 }} textAlign={'start'}>
          <Typography variant='h6' fontSize={'19px'}>
            Thumbnail
          </Typography>
          <Typography component={'p'} fontSize={'15px'}>
            Select or upload a picture that shows what's in your content. A good thumbnail stands out and draws viewers'
            attention.{' '}
            <Box component={'span'} color={themeColor}>
              Learn more
            </Box>
          </Typography>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} paddingBottom={'12px'}>
            <Box sx={{ flexGrow: 1, margin: 10 }}>
              <FileUploaderRestrictions
                name='thumbnail_url'
                accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }}
                maxFiles={1}
                maxSize={10000000}
                minSize={1}
                control={control}
              />
              {errors.thumbnail_url && (
                <FormHelperText sx={{ color: main, mt: 5 }}>{errors.thumbnail_url?.message}</FormHelperText>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default GoLiveForm
