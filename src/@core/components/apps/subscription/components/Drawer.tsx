import * as React from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Third Party Imports
import { useSubscription } from 'src/@core/hooks/apps/useSubscription'

// ** import form support components
import { FileUploader, InputField } from 'src/@core/components/form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Types Imports
import { FormHelperText, Grid } from '@mui/material'
import FileUploaderRestrictions from './FileUploader'
import { useTheme } from '@mui/material/styles'

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

const SubscriptionDrawer = (props: SidebarAddUserType) => {
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
    addSubscription,
    updateSubscription,
    store
  } = useSubscription(serviceId)
  const theme = useTheme()
  const onSubmit = async (data: any) => {
    data.expireYears = parseInt(data.expireYears)
    data.expireMonths = parseInt(data.expireMonths)
    data.expireDays = parseInt(data.expireDays)
    data.price = parseInt(data.price)
    data.actualPrice = parseInt(data.actualPrice)
    if (serviceId) {
      await updateSubscription(serviceId, data)
    } else {
      await addSubscription(data)
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
          <Typography variant='h6'>{!serviceId ? 'Add Subscription' : 'Update Subscription'}</Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ p: 5 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <InputField name='title' label='Title' placeholder='Enter Title' control={control} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name='expireYears'
                label='Expire Years'
                placeholder='Expire Years'
                type='number'
                control={control}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputField
                name='expireMonths'
                label='Expire Months'
                placeholder='Enter Expire Months'
                type='number'
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name='expireDays'
                label='Enter Expire Days'
                placeholder='Enter Expire Days'
                type='number'
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField name='price' label='Enter Price' placeholder='Enter Price' type='number' control={control} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name='actualPrice'
                label='Enter Actual Price'
                placeholder='Enter Actual Price'
                type='number'
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='subTitle'
                label='Enter SubTitle'
                placeholder='Enter SubTitle'
                type='text-area'
                rows={3}
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='description'
                label='Enter Description'
                placeholder='Enter Description'
                type='text-area'
                rows={3}
                control={control}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FileUploaderRestrictions
                name='logo'
                accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }}
                maxFiles={1}
                maxSize={10000000}
                minSize={1}
                control={control}
              />
              {errors?.logo && <FormHelperText sx={{ color: '#FF4D49' }}>{errors.logo.message}</FormHelperText>}
            </Grid> */}
          </Grid>
        </Box>
        <Footer>
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

export default SubscriptionDrawer
