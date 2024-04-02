import React, { ReactNode } from 'react'
import ReviewComp from 'src/@core/components/apps/review/components/ReviewComp'
import VideoLayout from 'src/@core/layouts/VideoLayout'
import UserLayout from 'src/layouts/UserLayout'

const Page = () => {
  return <ReviewComp />
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'comment-page'
}
Page.getLayout = (page: ReactNode) => (
  <UserLayout>
    <VideoLayout>{page}</VideoLayout>
  </UserLayout>
)

export async function getServerSideProps() {
  return {
    props: {}
  }
}

export default Page
