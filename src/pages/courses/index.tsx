// ** React Imports
import { useEffect } from 'react'
// ** Next Import
import Link from 'next/link'
// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Drawer from 'src/@core/components/apps/courses/components/Drawer'
import DeleteAlert from 'src/@core/components/common/deleteAlert'
//**import custom hooks */

import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { useCourses } from 'src/@core/hooks/apps/useCourses'
import CoursesTable from 'src/@core/components/apps/courses/components/Table'
import TableHeader from 'src/@core/components/apps/courses/components/TableHeader'

const Page = () => {
  // ** Hooks

  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()
  const { deleteCourse } = useCourses(null)

  useEffect(() => {
    // getAllTeachers({ query: '' })
    return () => {}
  }, [])

  const handleDelete = () => {
    serviceId && deleteCourse(serviceId)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card style={{ marginBottom: 10 }}>
          <TableHeader value={''} handleFilter={() => {}} toggle={() => handleDrawer(null)} />
        </Card>
        <CoursesTable />
      </Grid>
      <Drawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
      <DeleteAlert title='courses' onAgree={handleDelete} />
    </Grid>
  )
}
Page.acl = {
  action: 'itsHaveAccess',
  subject: 'teachers-page'
}

export default Page
