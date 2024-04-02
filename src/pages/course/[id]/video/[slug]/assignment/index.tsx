import React from 'react'
import Assignments from 'src/@core/components/apps/assignments/components/Assignments'

const Page = () => {
  return <Assignments />
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'assignment-page'
}

export async function getServerSideProps() {
  return {
    props: {}
  }
}

export default Page
