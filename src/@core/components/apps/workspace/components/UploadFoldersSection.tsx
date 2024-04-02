// ** MUI Imports
import Dialog from '@mui/material/Dialog'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { Box, Button, Grid, Typography } from '@mui/material'
import { InputField } from 'src/@core/components/form'
import { useWorkspace } from 'src/@core/hooks/apps/useWorkspace'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import LoadingButton from '@mui/lab/LoadingButton'

const Page = ({ title = 'records', onAgree, id }: { title?: string; onAgree: () => void; id?: string }) => {
  // ** hooks
  const { isModalOpen, handleModal } = useToggleDrawer()
  const handleClose = () => handleModal(null)

  const { control, handleSubmit, reset } = useForm()

  const { addWorkspaceFolder, getAllWorkspacesFolder, store, getWorkspace } = useWorkspace(null)

  const {
    query: { id: workspaceId }
  } = useRouter()

  const onSubmit = async (body: any) => {
    const { statusCode } = await addWorkspaceFolder(id as string, body)
    if (statusCode === '10000') {
      getWorkspace(workspaceId as string)
      handleClose()
      reset()
    }
  }

  return (
    <Dialog
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography textAlign={'center'} padding={10}>
          Create Folder
        </Typography>
        <Box
          display={'flex'}
          marginLeft='auto'
          style={{ marginBottom: 15, justifyContent: 'space-evenly', padding: 20, width: '600px' }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <InputField name='name' label='Enter Name' placeholder='Enter Name' control={control} required />
            </Grid>
          </Grid>
        </Box>
        <LoadingButton
          loading={store.status === 'pending'}
          disabled={store.status === 'pending'}
          variant='contained'
          sx={{
            display: 'block',
            margin: 'auto',
            marginBottom: 5
          }}
          type='submit'
          color='primary'
        >
          Submit
        </LoadingButton>
      </form>
    </Dialog>
  )
}

export default Page
