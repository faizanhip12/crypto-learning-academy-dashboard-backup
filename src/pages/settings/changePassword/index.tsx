import React, { ReactNode } from 'react'
import ProfileLayout from 'src/@core/layouts/ProfileLayout'
import UserLayout from 'src/layouts/UserLayout'
import ChangePassword from 'src/@core/components/apps/users/components/ChangePassword'


const Page = () => {
  return (
    <ChangePassword />
  )
}

Page.getLayout = (page: ReactNode) => (
  <UserLayout>
    <ProfileLayout>{page}</ProfileLayout>
  </UserLayout>
)

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'settings-profile-page'
}


export default Page