import { Box, BoxProps, Card, Typography, styled, Tooltip } from '@mui/material'
import React from 'react'
import CircularWithValueLabel from '../progressbar'
import { useRouter } from 'next/router'

const ProgresBox = styled('div')<BoxProps>(
  ({
    theme: {
      breakpoints: { down }
    }
  }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    [`${down('md')}`]: {}
  })
)

interface MyCurrentCource {
  class?: string
  totalcourses?: string
  courseCompletePercentage?: number
  channelId?: string
}

const ProgressBox = (props: MyCurrentCource) => {
  const { push } = useRouter()

  return (
    <>
      <Tooltip title={`Click to view ${props.class} course`}>
        <Box sx={{ cursor: 'pointer' }} onClick={() => push(`/channels/${props.channelId}/courses`)}>
          <Card sx={{ padding: 10 }}>
            <ProgresBox>
              <CircularWithValueLabel courseCompletePercentage={props?.courseCompletePercentage} />
              <Box>
                <Box sx={{ marginBottom: '15px' }}>
                  <Typography variant='body1' color='white'>
                    Class
                  </Typography>
                  <Typography color='white'>{props.class}</Typography>
                </Box>
                <Box>
                  <Typography variant='body1' color='white'>
                    Total Course Class
                  </Typography>
                  <Typography color='white'>{props.totalcourses}</Typography>
                </Box>
              </Box>
            </ProgresBox>
          </Card>
        </Box>
      </Tooltip>
    </>
  )
}

export default ProgressBox
