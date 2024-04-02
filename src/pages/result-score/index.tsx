import LoadingButton from '@mui/lab/LoadingButton'
import { Box, BoxProps, Grid, Typography, styled } from '@mui/material'
import React from 'react'
import ResultScore from 'src/@core/components/apps/current-course/components/resultscore'

const HeadingBox = styled('div')<BoxProps>(({ theme }) => ({
  marginBottom: '40px',
  [`${theme.breakpoints.down('md')}`]: {}
}))

const Page = () => {
  return (
    <>
      <Box>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <Typography variant='h3' color='white'>
              Result Score
            </Typography>
          </Grid>

          <Grid item md={3}>
            <ResultScore title='UI Design Beginner' />
          </Grid>

          <Grid item md={3}>
            <ResultScore title='UI Design Beginner' />
          </Grid>

          <Grid item md={3}>
            <ResultScore title='UI Design Beginner' />
          </Grid>

          <Grid item md={3}>
            <ResultScore title='UI Design Beginner' />
          </Grid>

          <Grid item md={3}>
            <ResultScore title='UI Design Beginner' />
          </Grid>         
        </Grid>

        <LoadingButton variant='outlined' sx={{marginTop:'50px', borderRadius:'5px', width:'100%', maxWidth:'130px', marginBottom:'0'}}>Back</LoadingButton>

        
      </Box>
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'result-score-page'
}

export default Page
