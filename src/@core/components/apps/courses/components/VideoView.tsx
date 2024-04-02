import React from 'react'

// ** MUI
import { CardContent, CardMedia, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import { IFile } from 'src/types/apps/file'
import { useTheme } from '@mui/material/styles'

const VideoView = ({ videoRef, video, width }: { videoRef?: any; video: IFile; width?: string }) => {
  const {
    palette: {
      customColors: { white }
    }
  } = useTheme()

  return (
    <Card sx={{ width: width ? width : '360px' }}>
      <CardMedia
        component='video'
        image={video?.file?.public_source_url}
        autoPlay
        width={width ? width : '345px'}
        sx={{ maxHeight: 250 }}
        ref={videoRef}
        height='auto'
        controls
      />
      <CardContent sx={{ textAlign: 'left' }}>
        <Typography component='p'>Video Link</Typography>
        <a
          href={video?.file?.public_source_url}
          target='_blank'
          style={{ textDecorationColor: white, wordBreak: 'break-all' }}
        >
          <Typography variant='caption'>{video?.file?.public_source_url || 'Not Found'}</Typography>
        </a>
      </CardContent>
    </Card>
  )
}

export default VideoView
