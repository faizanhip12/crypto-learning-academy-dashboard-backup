import * as React from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Third Party Imports
import { useStudents } from 'src/@core/hooks/apps/useStudents'

// ** import form support components
import { InputField, Select } from 'src/@core/components/form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Types Imports
import { Grid, MenuItem } from '@mui/material'
import UsersMultiSelect from './UsersMultiSelect'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { conversationStart, fetchChatsContacts } from 'src/store/apps/chat'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  serviceId: string | null
}

const Header = styled(Box)<BoxProps>(
  ({
    theme: {
      spacing,
      palette: { background }
    }
  }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: spacing(3, 4),
    justifyContent: 'space-between',
    backgroundColor: background.default
  })
)

const Footer = styled(Box)<BoxProps>(
  ({
    theme: {
      spacing,
      palette: { background }
    }
  }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: spacing(3, 4),
    justifyContent: 'space-between',
    backgroundColor: background.default
  })
)

const ChatDrawer = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, serviceId } = props
  const { handleDrawer, isDrawerOpen } = useToggleDrawer()

  // ** Hooks
  const { store } = useStudents(serviceId)

  React.useEffect(() => {
    return () => {
      setValue('name', '')
      setValue('users', [])
    }
  }, [])

  const { handleSubmit, setValue, reset, getValues, control } = useForm()

  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch()

  const onSubmit = async (data: any) => {
    if (!data.users) {
      return toast.error('Please Select User')
    } else if (data.users?.length === 1) {
      return toast.error('Please Select Atleast Two Users')
    } else {
      setValue('name', '')
      setValue('users', [] || '')
      const result = await dispatch(conversationStart({ name: data?.name, participants: data?.users }))
      const { payload } = result
      if (payload?.statusCode === '10000') {
        // @ts-ignore
        dispatch(fetchChatsContacts())
        setValue('users', [] || '')
        setValue('name', '')
        handleDrawer(null)
        reset()
      } else {
        toast.error(payload?.message || 'Internal Error')
      }
    }
    // if (serviceId) {
    //   await updateStudent(serviceId, data)
    // } else {
    //   await addStudent(data)
    // }
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
          <Typography variant='h6'>{!serviceId ? 'Add Participants' : 'Update Participants'}</Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ p: 5 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <InputField
                name='name'
                label='Group Name'
                placeholder='Enter Group Name'
                type='text'
                control={control}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <UsersMultiSelect
                users={getValues('users')}
                setUsers={selectedUser => {
                  setValue(
                    'users',
                    selectedUser?.map(selectedUsers => selectedUsers?.id)
                  )
                }}
              />
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
            color='primary'
            type='submit'
          >
            Submit
          </LoadingButton>
        </Footer>
      </form>
    </Drawer>
  )
}

export default ChatDrawer
