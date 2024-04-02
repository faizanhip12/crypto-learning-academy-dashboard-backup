import React from 'react'
import VideoUploader from 'src/@core/components/apps/videos/components/VideoUploader'
import ChannelAnalytics from 'src/@core/components/apps/videos/components/ChannelAnalytics'
import { Grid } from '@mui/material'
import TeacherList from 'src/@core/components/apps/videos/components/TeacherList'
import Drawer from 'src/@core/components/apps/courses/components/Drawer'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { useCourses } from 'src/@core/hooks/apps/useCourses'
import Cards from 'src/@core/components/apps/users-channels/components/Cards'

const Page = () => {
  return (
    <>
      {/* @ts-ignore */}
      <Cards />
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'users-channels-page'
}

export default Page
