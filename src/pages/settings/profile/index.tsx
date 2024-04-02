import React, { ReactNode, useEffect, useState } from 'react'
import { Card, CardContent, Divider, Grid, MenuItem, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { InputField } from 'src/@core/components/form'
import FileUploader from 'src/@core/components/apps/profile/components/FileUploader'
import { useUser } from 'src/@core/hooks/apps/useUser'
import { useAuth } from 'src/hooks/useAuth'
import SelectField from 'src/@core/components/form/Select'
import { IUser } from 'src/types/apps/user'
import LoadingButton from '@mui/lab/LoadingButton'
import UserLayout from 'src/layouts/UserLayout'
import ProfileLayout from 'src/@core/layouts/ProfileLayout'

const Page = () => {
  const {
    form: { handleSubmit, control, setValue }
  } = useUser(null)

  const { user, profileUpdate, status }: IUser = useAuth()
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    setValue('first_name', user?.first_name)
    setValue('last_name', user?.last_name)
    setValue('email', user?.email)
    setValue('phone', parseInt(user?.phone))
    setValue('username', user?.username)
  }, [user])

  const onSubmit = (body: IUser) => {
    setFormLoading(true)
    body.role = user?.role?.code
    profileUpdate(user?.id, body, (err: any) => {
      if (err) {
        setFormLoading(false)
      } else {
        setFormLoading(false)
      }
    })
  }

  return (
    <>
      {/* <Typography variant='h4' mb={5}>
        Profile Section
      </Typography> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ background: 'transparent !important', width: '80%', margin: '0 auto', justifyContent: 'center' }}>
          <Typography variant='h4' padding={5}>
            Profile Management
          </Typography>
          <Divider />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item md={5} xs={12} marginBottom={5}>
                <InputField
                  name='first_name'
                  type='text'
                  label='First Name'
                  placeholder='Please Enter Your First Name'
                  control={control}
                />
              </Grid>
              <Grid item md={5} xs={12} marginBottom={5}>
                <InputField
                  type='text'
                  label='Last Name'
                  name='last_name'
                  placeholder='Please Enter Your Last Name'
                  control={control}
                />
              </Grid>
              <Grid item md={5} xs={12} marginBottom={5}>
                <InputField
                  type='email'
                  label='Email'
                  name='email'
                  placeholder='Please Enter Your Email'
                  control={control}
                />
              </Grid>
              <Grid item md={5} xs={12} marginBottom={5}>
                <InputField
                  type='number'
                  label='Phone'
                  name='phone'
                  placeholder='Please Enter Your Phone'
                  control={control}
                />
              </Grid>
              <Grid item md={5} xs={12} marginBottom={5}>
                <InputField
                  type='text'
                  label='User Name'
                  name='username'
                  placeholder='Please Enter Your User Name'
                  control={control}
                />
              </Grid>
              <Grid item md={5} xs={12} marginBottom={5}>
                <SelectField
                  defaultValue={user?.gender}
                  name='gender'
                  label='Gender'
                  placeholder='Gender'
                  control={control}
                >
                  <MenuItem value='MALE'>MALE</MenuItem>
                  <MenuItem value='FEMALE'>FEMALE</MenuItem>
                </SelectField>
              </Grid>
            </Grid>
          </CardContent>
          {/* <Divider /> */}
          <Typography variant='h6' sx={{ marginLeft: '20px' }}>
            Profile Picture
          </Typography>
          <Card sx={{ mb: '50px', width: '500px', display: 'flex', justifyContent: 'flex-start', marginLeft: '20px' }}>
            <Grid item md={5}>
              <FileUploader
                name='profile_picture'
                accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                maxFiles={1}
                maxSize={10000000}
                minSize={1}
                control={control}
              />
            </Grid>
          </Card>
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
              Submit
            </LoadingButton>
          </Box>
        </Card>
      </form>
    </>
  )
}

Page.getLayout = (page: ReactNode) => (
  <UserLayout>
    <ProfileLayout>{page}</ProfileLayout>
  </UserLayout>
)

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'settings-profile-page'
}

export default Page
