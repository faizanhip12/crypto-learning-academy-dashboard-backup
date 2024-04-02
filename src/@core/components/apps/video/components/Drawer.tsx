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
import { useVideo } from 'src/@core/hooks/apps/useVideo'

// ** import form support components
import { InputField, Select, DateTimePicker } from 'src/@core/components/form'
// import MultiSelect from 'src/@core/components/apps/category/components/CategoriesMultiSelect'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Types Imports
import { Grid, TextField } from '@mui/material'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import FileUploaderRestrictions from 'src/@core/components/form/File/FileUploaderRestrictions'
import UserSingleSelect from './UserSingleSelect'

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

const VideoDrawer = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, serviceId } = props

  // ** Hooks
  const {
    form: {
      control,
      reset,
      handleSubmit,
      formState: { errors },
      setValue,
      getValues
    },
    addVideo,
    updateVideo,
    store
  } = useVideo(serviceId)

  const onSubmit = async (data: any) => {
    delete data.startAt
    if (serviceId) {
      await updateVideo(serviceId, data)
    } else {
      await addVideo(data)
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
          <Typography variant='h6'>{!serviceId ? 'Add Video' : 'Update Video'}</Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ p: 5 }}>
          <Grid container spacing={4} marginBottom={5}>
            <Grid item xs={12} sm={12}>
              <InputField name='name' label='Video name' placeholder='Enter Video Name' control={control} />
            </Grid>
          </Grid>
          <Grid container spacing={4} marginBottom={5}>
            <Grid item xs={12} sm={6}></Grid>
          </Grid>
          <Grid container spacing={4} marginBottom={5}>
            <Grid item xs={12} sm={6}>
              <UserSingleSelect
                // @ts-ignore
                user={getValues('user')}
                // @ts-ignore
                setUser={e => setValue('user', console.log(e))}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FileUploaderRestrictions
              name='file'
              accept={{ 'video/*': ['.mp4'] }}
              maxFiles={1}
              maxSize={1024 * 1024}
              minSize={1}
              control={control}
            />
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

export default VideoDrawer
