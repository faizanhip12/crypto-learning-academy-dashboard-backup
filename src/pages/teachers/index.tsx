// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Drawer from 'src/@core/components/apps/teachers/components/Drawer'
import DeleteAlert from 'src/@core/components/common/deleteAlert'
//**import custom hooks */

import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { useTeacher } from 'src/@core/hooks/apps/useteacher'
import TeacherTable from 'src/@core/components/apps/teachers/components/Table'
import TableHeader from 'src/@core/components/apps/teachers/components/TableHeader'
import { Card, Typography } from '@mui/material'
const Page = () => {
  // ** Hooks

  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()
  const { deleteTeacher, getAllTeachers, getTeacher } = useTeacher(null)

  useEffect(() => {
    getAllTeachers({ query: '' })
    return () => {}
  }, [])

  const handleDelete = () => {
    serviceId && deleteTeacher(serviceId)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' textAlign={'center'} mb={10}>
          Teachers List
        </Typography>
        <TableHeader toggle={() => handleDrawer(null)} value={''} handleFilter={() => {}} />
        <TeacherTable />
      </Grid>
      <Drawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
      <DeleteAlert title='teachers' onAgree={handleDelete} />
    </Grid>
  )
}
Page.acl = {
  action: 'itsHaveAccess',
  subject: 'teachers-page'
}

export default Page
