// ** React Imports
import { useState, ChangeEvent, Fragment, useEffect } from 'react'

// ** MUI
import Grid from '@mui/material/Grid'

// ** Custom components
import VideoView from 'src/@core/components/apps/courses/components/VideoView'
import { InputField } from 'src/@core/components/form'

// ** Custom hooks
import { useCourses } from 'src/@core/hooks/apps/useCourses'
import { useFormContext } from 'react-hook-form'
import { Box } from '@mui/system'
import { Paper, Typography, styled } from '@mui/material'
import ThumbnailUploader from './ThumbnailUploader'
import PlaylistSelect from './SelectPlaylist'
import { useTheme } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : theme.palette.customColors.white,
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

const Details = ({ step }: { step: number }) => {
  // ** Hooks
  const { file } = useCourses(null)
  const {
    palette: {
      error: { main },
      customColors: { themeColor }
    }
  } = useTheme()
  const { control, formState, setValue, getValues } = useFormContext()

  return (
    <Fragment key={step}>
      <Grid container>
        <Grid item xs={7} sx={{ padding: 5 }}>
          <PlaylistSelect
            execute={true}
            playlist={getValues('playlistId')}
            setPlaylist={e => setValue('playlistId', e?.id)}
          />
          {formState?.errors?.playlistId && (
            <Typography mt={2} fontWeight={'400'} color={main} fontSize={'0.75rem'} textAlign={'left'}>
              {formState?.errors?.playlistId?.message}
            </Typography>
          )}
          <InputField
            name='title'
            label='Title'
            placeholder='Title'
            rows={3}
            type='text-area'
            control={control}
            sx={{ mt: 5 }}
          />
          <InputField
            sx={{ marginTop: 5 }}
            name='description'
            label='Description'
            placeholder='Tell viewers about your video'
            type='text-area'
            rows={5}
            control={control}
          />
        </Grid>
        <Grid item xs={5} sx={{ padding: 5 }}>
          <VideoView video={file.file} />
        </Grid>
        <Grid sx={{ padding: 5 }} textAlign={'start'}>
          <Typography variant='h6' fontSize={'19px'}>
            Thumbnail
          </Typography>
          <Typography component={'p'} fontSize={'15px'}>
            Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers'
            attention.{' '}
            <Box component={'span'} color={themeColor}>
              Learn more
            </Box>
          </Typography>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} paddingBottom={'12px'}>
            <Item>
              <Box sx={{ flexGrow: 1 }}>
                <ThumbnailUploader
                  name='thumbnail_url'
                  accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }}
                  // accept={{ 'video/*': ['.mp4'] }}
                  maxFiles={1}
                  maxSize={10000000 * 10}
                  minSize={1}
                  control={control}
                  onUpload={e => {
                    getValues('thumbnail_url')
                    setValue('thumbnail_url', e?.file?.private_source_url)
                  }}
                />
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default Details
