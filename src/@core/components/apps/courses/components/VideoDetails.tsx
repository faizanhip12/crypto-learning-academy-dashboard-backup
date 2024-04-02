import React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

import { CardContent, CardHeader, Stack, TextField, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import Image from 'next/image'
// ** Custom Component
import VideoView from 'src/@core/components/apps/courses/components/VideoView'
import { InputField } from 'src/@core/components/form'

import { useCourses } from 'src/@core/hooks/apps/useCourses'

const VideoDetails = () => {
  // ** Hooks
  const {
    form: { control },
    file
  } = useCourses(null)

  return (
    <Grid container sx={{ width: 800 }}>
      <Grid item xs={7} sx={{ padding: 5 }}>
        <InputField
          name='title'
          label='Title (required)'
          placeholder='Title'
          rows={3}
          type='text-area'
          control={control}
        />
        <InputField
          sx={{ marginTop: '20px' }}
          name='description'
          label='Description'
          placeholder='Tell viewers about your video'
          type='text-area'
          rows={5}
          control={control}
        />
        {/* <Subtitle control={control} /> */}
      </Grid>
      <Grid item xs={5} sx={{ padding: 5 }}>
        <VideoView video={file} />
      </Grid>
      <Grid sx={{ padding: 5 }}>
        <Typography variant='h6'>Thumbnail</Typography>
        <Typography variant='h6'>
          Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers'
          attention. Learn more
        </Typography>
      </Grid>
    </Grid>
  )
}

export default VideoDetails
