import { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Table from 'src/@core/components/apps/milestone/components/Table'
import Drawer from 'src/@core/components/apps/milestone/components/Drawer'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { Typography } from '@mui/material'
import { useMilestone } from 'src/@core/hooks/apps/useMilestones'
import TableHeader from 'src/@core/components/apps/milestone/components/TableHeader'
import DeleteAlert from 'src/@core/components/common/deleteAlert'
import { ModalType } from 'src/types'

const Page = () => {
  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()
  const { getAllMilestones, deleteMilestone } = useMilestone(null)

  useEffect(() => {
    getAllMilestones({ query: '' })
  }, [])

  const handleDeleteChannel = () => {
    serviceId && deleteMilestone(serviceId)
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h3' textAlign={'center'} mb={10}>
            Milestone Management
          </Typography>
          <TableHeader value={''} handleFilter={() => {}} toggle={() => handleDrawer(null)} />
          <Table />
        </Grid>
        <Drawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
        <DeleteAlert title='milestone' type={ModalType.MILESTONES} onAgree={() => handleDeleteChannel()} />
      </Grid>
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'milestone-page'
}

export default Page
