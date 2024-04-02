import React, { ReactNode } from 'react'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

const CheckoutConfirm = () => {
  return <div>CheckoutConfirm</div>
}

CheckoutConfirm.guestGuard = true
CheckoutConfirm.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default CheckoutConfirm
