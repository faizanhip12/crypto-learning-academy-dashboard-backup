import * as React from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Third Party Imports
import { usePoints } from 'src/@core/hooks/apps/usePoints'

// ** import form support components
import { InputField, Select } from 'src/@core/components/form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Types Imports
import { Grid, MenuItem } from '@mui/material'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  serviceId: string | null
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const Footer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const PointsDrawer = (props: SidebarAddUserType) => {
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
    addPoint,
    updatePoint,
    store
  } = usePoints(serviceId)

  const onSubmit = async (data: any) => {
    if (serviceId) {
      await updatePoint(serviceId, data)
    } else {
      await addPoint(data)
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
          <Typography variant='h6'>{!serviceId ? 'Add Point' : 'Update Point'}</Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ p: 5 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <InputField name='value' label='Points' placeholder='Points' type='number' control={control} />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <InputField name='last_name' label='Last Name' placeholder='Last Name' type='text' control={control} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputField name='email' label='email' placeholder='Enter Time' type='email' control={control} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField name='phone' label='Enter Phone' placeholder='Enter Phone' type='number' control={control} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select name='gender' label='Gender' placeholder='Gender' control={control}>
                <MenuItem value='MALE'>Male</MenuItem>
                <MenuItem value='FEMALE'>Female</MenuItem>
              </Select>
            </Grid> */}
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

export default PointsDrawer
