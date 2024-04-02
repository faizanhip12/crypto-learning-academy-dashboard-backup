// ** React Imports
import { Divider, Grid, Typography } from '@mui/material'
import { Box } from '@mui/material'
import { useState, ChangeEvent, Fragment, useEffect } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import { useTheme } from '@mui/material/styles'

const Check = ({ step }: { step: number }) => {
  const {
    palette: {
      customColors: { themeColor }
    }
  } = useTheme()

  return (
    <Fragment key={step}>
      <Grid container>
        <Box display={'flex'} flexDirection={'column'} alignItems={'start'}>
          <Box>
            <Typography variant='h6'>Checks</Typography>
          </Box>
          <Box>
            <Typography variant='body2' textAlign={'left'}>
              We'll check your video for issues that may restrict its visibility and then you will have the opportunity
              to fix issues before publishing your video.{' '}
              <Box component={'span'} color={themeColor} sx={{ cursor: 'pointer' }}>
                Learn more
              </Box>
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid container>
        <Box sx={{ mt: '5%' }}>
          <Typography variant='h6'>Copyright</Typography>
        </Box>
      </Grid>
      <Grid container>
        <Box>
          <Typography variant='body2'>No issues found</Typography>
        </Box>
      </Grid>
      <Box sx={{ mt: 10 }}>
        <Divider />
      </Box>
      <Grid container sx={{ mt: 5 }}>
        <Grid item xs={9}>
          <Box>
            <Typography component='p' textAlign={'left'}>
              Remember: These check results aren't final. Issues may come up in the future that impact your video.
              <Box component={'span'} color={themeColor} sx={{ cursor: 'pointer' }}>
                {' '}
                Learn more
              </Box>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box display={'flex'} flexDirection={'column'}>
            <Box>
              <CheckIcon color='success' />
            </Box>
            <Typography component={'p'} color={themeColor}>
              Send feedback
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default Check
