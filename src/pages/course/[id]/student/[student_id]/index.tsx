import { Stack, Typography, Box } from '@mui/material'
import React from 'react'

const Page = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Stack>
          <Typography variant='h3'>Student</Typography>
        </Stack>
      </Box>
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'single-student-page'
}

export async function getServerSideProps() {
  // Return the fetched data as props
  return {
    props: {}
  }
}

export default Page
