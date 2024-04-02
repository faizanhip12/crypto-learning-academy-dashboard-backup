import React from 'react'
import StudentCertificate from 'src/@core/components/apps/certification/components/Certificate'

const Page = () => {
  return <StudentCertificate />
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'teacher-certification-page'
}

export async function getServerSideProps() {
  // Return the fetched data as props
  return {
    props: {}
  }
}

export default Page
