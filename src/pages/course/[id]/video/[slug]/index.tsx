import React from 'react'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
// ** Component Imports
import VideoLayout from 'src/@core/layouts/VideoLayout'
import UserLayout from 'src/layouts/UserLayout'
import VideosListRev from 'src/@core/components/apps/video/components/ListRev'

const Page = () => {
  const {
    query: { id, slug }
  } = useRouter()

  return id && slug && <VideosListRev />
}

Page.getLayout = (page: ReactNode) => (
  <UserLayout>
    <VideoLayout>{page}</VideoLayout>
  </UserLayout>
)

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'playlist-page'
}

export async function getServerSideProps() {
  return {
    props: {}
  }
}

export default Page
