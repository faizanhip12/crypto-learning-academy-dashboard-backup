import { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Table from 'src/@core/components/apps/feedback/components/Table'
import { Typography } from '@mui/material'
import { useFeedbacks } from 'src/@core/hooks/apps/useFeedback'

const Page = () => {
  const { getFeedbacks } = useFeedbacks()

  useEffect(() => {
    getFeedbacks()
  }, [])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h3' textAlign={'center'} mb={10}>
            Feedback
          </Typography>
          <Table />
        </Grid>
      </Grid>
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'feedbacks-page'
}

export default Page
