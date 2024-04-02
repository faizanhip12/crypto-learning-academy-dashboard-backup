import React, { useEffect } from 'react'
import Certification from 'src/@core/components/apps/certification/components/Certificate'

const Page = () => {
  return (
    <>
      <Certification />
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'certification-page'
}

export async function getServerSideProps() {
  // Return the fetched data as props
  return {
    props: {}
  }
}

export default Page
