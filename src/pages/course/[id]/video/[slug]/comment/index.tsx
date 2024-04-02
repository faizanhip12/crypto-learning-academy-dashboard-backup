import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import CommentSection from 'src/@core/components/apps/videos/components/CommentSection'
import VideoLayout from 'src/@core/layouts/VideoLayout'
import UserLayout from 'src/layouts/UserLayout'

const Page = () => {
  const {
    query: { id, slug }
  } = useRouter()

  return <CommentSection videoId={slug} />
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
