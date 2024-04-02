import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import VideosList from 'src/@core/components/apps/video/components/List'
import ChannelLayout from 'src/@core/layouts/ChannelLayout'
import UserLayout from 'src/layouts/UserLayout'

const Page = () => {
  const {
    query: { id }
  } = useRouter()

  return <>{id && typeof id === 'string' && <VideosList channelId={id} />}</>
}

Page.getLayout = (page: ReactNode) => (
  <UserLayout>
    <ChannelLayout>{page}</ChannelLayout>
  </UserLayout>
)

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'channels-page'
}

export async function getServerSideProps() {
  return {
    props: {}
  }
}

export default Page
