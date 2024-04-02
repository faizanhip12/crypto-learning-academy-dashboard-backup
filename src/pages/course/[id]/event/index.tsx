import React from 'react'
import { Typography } from '@mui/material'
import Calendar from 'src/@core/components/apps/calendar'

const Page = () => {
  return (
    <>
      <Typography variant='h5' textAlign={'center'}>
        Course Events
      </Typography>
      <Calendar />
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'course-event-page'
}

export async function getServerSideProps() {
  // Return the fetched data as props
  return {
    props: {}
  }
}

export default Page
