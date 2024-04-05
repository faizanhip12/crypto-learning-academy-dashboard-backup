import { useEffect } from 'react'
import * as React from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'

import { useSelector } from 'react-redux'

// ** Third Party Imports
import { useTeacher } from 'src/@core/hooks/apps/useteacher'

// ** import form support components
import { InputField, Select, DateTimePicker } from 'src/@core/components/form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Types Imports
import { Grid, TextField } from '@mui/material'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  serviceId: string | null
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between'
  // backgroundColor: theme.palette.background.default
}))

const Footer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const StudentDrawer = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, serviceId } = props

  // ** Hooks
  const {
    form: {
      control,
      reset,
      handleSubmit,
      formState: { errors },
      setValue
    },
    addTeacher,
    updateTeacher,
    store
  } = useTeacher(serviceId)

  const onSubmit = async (data: any) => {
    if (serviceId) {
      await updateTeacher(serviceId, data)
    } else {
      await addTeacher(data)
    }
  }

  const handleClose = () => {
    reset()
    toggle()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: 700 } }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>
          <Typography variant='h6'>{!serviceId ? 'Add Teacher' : 'Update Teacher'}</Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ p: 5 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <InputField name='first_name' label='First Name' placeholder='First Name' type='text' control={control} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField name='last_name' label='Last Name' placeholder='Last Name' type='text' control={control} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField name='email' label='email' placeholder='Enter Email' type='email' control={control} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField name='password' label='password' placeholder='Enter Password' type='password' control={control} />
            </Grid>
            {/* {!serviceId ? (
              <Grid item xs={12} sm={6}>
                <InputField
                  name='password'
                  label='Enter Password'
                  placeholder='Enter Password'
                  control={control}
                />
              </Grid>
            ) : null} */}
            <Grid item xs={12} sm={6}>
              <InputField name='phone' label='Enter Phone' placeholder='Enter Phone' type='number' control={control} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select name='gender' label='Gender' placeholder='Select Gender' control={control}>
                <MenuItem value='MALE'>Male</MenuItem>
                <MenuItem value='FEMALE'>Female</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Box>
        <Footer sx={{ position: 'absolute', bottom: '0', width: '100%' }}>
          <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            sx={{ mr: 3 }}
            loading={store.status === 'pending'}
            disabled={store.status === 'pending'}
            loadingPosition='end'
            size='large'
            variant='contained'
            type='submit'
            color='primary'
          >
            Submit
          </LoadingButton>
        </Footer>
      </form>
    </Drawer>
  )
}

export default StudentDrawer
