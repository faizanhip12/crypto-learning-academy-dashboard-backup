// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import PaymentDrawer from 'src/@core/components/apps/teachers/components/PaymentDrawer'
import DeleteAlert from 'src/@core/components/common/deleteAlert'
//**import custom hooks */

import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { usePayment } from 'src/@core/hooks/apps/usePayment'
import PaymentTable from 'src/@core/components/apps/teachers/components/PaymentTable'
import PaymentTableHeader from 'src/@core/components/apps/teachers/components/PaymentTableHeader'
import { Typography } from '@mui/material'
const Page = () => {
  // ** Hooks

  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()
  const { deletePayment, getAllPayments, getPayment } = usePayment(null)

  useEffect(() => {
    getAllPayments({ query: '' })
    return () => {}
  }, [])

  const handleDelete = () => {
    serviceId && deletePayment(serviceId)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Teachers Payment</Typography>
        <PaymentTable />
      </Grid>
      {/* <PaymentDrawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} /> */}
      <DeleteAlert title='teachers' onAgree={handleDelete} />
    </Grid>
  )
}
Page.acl = {
  action: 'itsHaveAccess',
  subject: 'teachers-payments-page'
}

export default Page
