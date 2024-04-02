import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FileUploaderRestrictions from './FileUploaderRestrictions'
import { InputField } from 'src/@core/components/form'
import { FormLabel, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Close } from 'mdi-material-ui'
import LoadingButton from '@mui/lab/LoadingButton'
import { useCommunityFeed } from 'src/@core/hooks/apps/useCommunityFeed'
import { IFile } from 'src/types/apps/file'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

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

const CommunityDrawer = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, serviceId } = props

  const [files, setFiles] = React.useState([])

  const {
    form: {
      control,
      handleSubmit,
      formState: { errors },
      reset
    },
    store,
    updateCommunityFeed
  } = useCommunityFeed(serviceId)

  const { file, status }: IFile = useSelector(({ file }: RootState) => ({
    file: file?.file,
    status: file?.status
  }))

  const onSubmit = (body: any) => {
    body.image = file ? file?.file?.public_source_url : ''
    if (serviceId) {
      updateCommunityFeed(serviceId, body)
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
          <Typography variant='h6'>{!serviceId ? 'Create Feed' : 'Update Feed'}</Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ padding: 5 }}>
          <Grid container spacing={10}>
            <Grid item xs={12} sm={12}>
              <FormLabel sx={{ display: 'block', marginBottom: 2 }}>Content</FormLabel>
              <InputField
                variant='outlined'
                type='text-area'
                name='content'
                fullWidth
                multiline
                minRows={5}
                size='small'
                placeholder='Whats On Your Mind...'
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} margin={0} marginRight={0}>
              <Box width={'100%'} marginRight={0}>
                <FileUploaderRestrictions
                  accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }}
                  maxFiles={1}
                  maxSize={10000000}
                  minSize={1}
                  name='image'
                  files={files}
                  setFiles={setFiles}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} textAlign={'center'}>
            <LoadingButton
              loading={store.status === 'pending' || status === 'pending'}
              disabled={store.status === 'pending' || status === 'pending'}
              sx={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 5,
                width: '141px'
              }}
              type='submit'
              variant='contained'
              color='primary'
            >
              {store.status === 'pending' ? 'Submitting' : 'Submit'}
            </LoadingButton>
          </Grid>
        </Box>
      </form>
    </Drawer>
  )
}

export default CommunityDrawer
