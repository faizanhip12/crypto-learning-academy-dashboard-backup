// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import Table from 'src/@core/components/apps/points-management/components/Table'
import Drawer from 'src/@core/components/apps/points-management/components/Drawer'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { usePoints } from 'src/@core/hooks/apps/usePoints'
import { Typography } from '@mui/material'

const Page = () => {
  // ** Hooks

  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()
  const { getAllPoints } = usePoints(null)

  useEffect(() => {
    getAllPoints({ query: '' })
    return () => {}
  }, [])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h3' textAlign={'center'} mb={10}>
            Points Management
          </Typography>
          <Table />
        </Grid>
        <Drawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
      </Grid>
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'points-management-page'
}

export default Page
