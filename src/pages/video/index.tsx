// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import TableHeader from 'src/@core/components/apps/video/components/TableHeader'
import Table from 'src/@core/components/apps/video/components/Table'
import Drawer from 'src/@core/components/apps/video/components/Drawer'
import DeleteAlert from 'src/@core/components/common/deleteAlert'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { useVideo } from 'src/@core/hooks/apps/useVideo'

const Page = () => {
  // ** Hooks

  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()
  // const { deleteVideo, getAllVideos, getVideo } = useVideo(null)

  useEffect(() => {
    // getAllVideos({ query: '' })
    // return () => {}
  }, [])

  const handleDelete = () => {
    // serviceId && deleteVideo(serviceId)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card style={{ marginBottom: 10 }}>
          <TableHeader value={''} handleFilter={() => {}} toggle={() => handleDrawer(null)} />
        </Card>
        <Table />
      </Grid>
      <Drawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
      <DeleteAlert title='challenge' onAgree={handleDelete} />
    </Grid>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'video-page'
}

export default Page
