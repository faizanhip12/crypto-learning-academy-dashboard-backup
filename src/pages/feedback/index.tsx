import Grid from '@mui/material/Grid'
import Form from 'src/@core/components/apps/feedback/components/Form'
import { Typography } from '@mui/material'

const Page = () => {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h3' textAlign={'center'} mb={10}>
            Provide Feedback
          </Typography>
          <Form />
        </Grid>
      </Grid>
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'feedback-page'
}

export default Page
