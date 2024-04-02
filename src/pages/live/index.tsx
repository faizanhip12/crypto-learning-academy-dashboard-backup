import React from 'react'
import dynamic from 'next/dynamic'
import GoLiveForm from 'src/@core/components/apps/liveVideoSdk/Form'
// const LiveVideoSDK = dynamic(() => import('src/@core/components/apps/liveVideoSdk/LiveVideoSDK'), {
//   ssr: false // Disable server-side rendering
// })

const Page = () => {
  return (
    <GoLiveForm />
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'go-live-page'
}

export default Page
