// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import TableHeader from 'src/@core/components/apps/users/components/TableHeader'
import Table from 'src/@core/components/apps/users/components/Table'
import DeleteAlert from 'src/@core/components/common/deleteAlert'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { useUser } from 'src/@core/hooks/apps/useUser'

const Page = () => {
  // ** Hooks
  const { serviceId } = useToggleDrawer()
  const { getUsers, deleteUser, store } = useUser(null)

  useEffect(() => {
    getUsers({ query: '' })
    return () => {}
  }, [])

  const handleDelete = () => {
    serviceId && deleteUser(serviceId)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card style={{ marginBottom: 10 }}>
          <TableHeader value={''} handleFilter={() => {}} />
        </Card>
        <Table />
      </Grid>
      <DeleteAlert title='user & company' onAgree={handleDelete} />
    </Grid>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'employee-page'
}

export default Page
