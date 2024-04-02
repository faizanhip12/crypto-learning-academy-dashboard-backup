import React from 'react'
import VideoUploader from 'src/@core/components/apps/videos/components/VideoUploader'
import { Grid } from '@mui/material'
import Drawer from 'src/@core/components/apps/courses/components/Drawer'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { AppDispatch } from 'src/store'
import { useDispatch } from 'react-redux'
import { Slice } from 'src/store/apps/file'

const Page = () => {
  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()

  const dispatch = useDispatch<AppDispatch>()

  React.useEffect(() => {
    if (!isDrawerOpen) {
      dispatch(Slice.actions.handleRemoveFile({}))
    }
  }, [!isDrawerOpen])

  return (
    <>
      <Grid container>
        <Grid item xl={4} lg={5} md={7} sm={8} xs={12}>
          <VideoUploader
            name='file'
            accept={{ 'video/*': ['.mp4'] }}
            maxFiles={1}
            maxSize={10000000000}
            // maxSize={10000000 * 10}
            minSize={1}
            onUpload={file => {
              handleDrawer(null)
            }}
          />
        </Grid>
      </Grid>
      <Drawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'videos-page'
}

export default Page
