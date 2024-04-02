import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import useAsync from 'src/@core/hooks/useAsync'
import { ChannelService } from 'src/services'

const Page = () => {
  const { push } = useRouter()

  useEffect(() => {
    toast.success('Payment Success')
  }, [])

  return (
    <>
      <Box
        component={'div'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        height={'60vh'}
        flexDirection={'column'}
      >
        <Typography variant='h3' textAlign={'center'} fontWeight={'bold'}>
          Thank You
        </Typography>
        <Box>
          <Typography>You Subscribed  Crypto Learning Academy, Thanks for choosing us!...</Typography>
        </Box>
        <Box mt={5}>
          <Button variant='contained' onClick={() => push('/payment')}>
            Back
          </Button>
        </Box>
      </Box>
    </>
  )
}
Page.acl = {
  action: 'itsHaveAccess',
  subject: 'payment-success-page'
}

export default Page
