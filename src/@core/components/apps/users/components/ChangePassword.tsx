import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from 'src/@core/components/form'
import { useAuth } from 'src/hooks/useAuth'

const Page = () => {
  const { control, handleSubmit, reset } = useForm()

  const { changeCredentials, status } = useAuth()
  const [formLoading, setFormLoading] = useState(false)

  const onSubmit = (body: any) => {
    setFormLoading(true)
    changeCredentials(body, err => {
      if (err) {
        setFormLoading(false)
      }
    })
  }

  return (
    <>

      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ background: 'transparent !important', width: '80%', margin: '0 auto', justifyContent: 'center' }}>
          <Typography variant='h4' mb={5} mt={5} paddingLeft={5}>
            Change Password
          </Typography>
          <Divider />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item md={5} xs={12} marginBottom={5}>
                <InputField
                  type='password'
                  label='Change Password'
                  name='oldPassword'
                  placeholder='Please Enter Your Old Password'
                  control={control}
                  required
                />
              </Grid>
              <Grid item md={5} xs={12} marginBottom={5}>
                <InputField
                  type='password'
                  label='New Password'
                  name='confirmPassword'
                  placeholder='Please Enter Your New Password'
                  control={control}
                  required
                />
              </Grid>
              <Grid item md={10} xs={12} marginBottom={5}>
                <InputField
                  type='password'
                  label='Confirm Password'
                  name='newPassword'
                  placeholder='Please Enter Your New Password'
                  control={control}
                  required
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
             sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              p: 5
            }}
          >
            <LoadingButton
              color='primary'
              variant='contained'
              type='submit'
              loading={formLoading}
              disabled={formLoading}
            >
              Save details
            </LoadingButton>
          </Box>
        </Card>
      </form>
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'change-password-page'
}

export default Page
