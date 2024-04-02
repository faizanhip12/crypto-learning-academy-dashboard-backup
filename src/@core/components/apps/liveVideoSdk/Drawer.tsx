import * as React from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Third Party Imports
import { useCourses } from 'src/@core/hooks/apps/useCourses'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { Grid } from '@mui/material'
import { InputField } from '../../form'
import FileUploaderRestrictions from 'src/@core/components/form/File/FileUploaderRestrictions'
import { useTheme } from '@mui/material/styles'

const inputStyle = {
  font: 'inherit',
  border: '1px solid #424247',
  borderRadius: '8px',
  background: 'none',
  height: '1.4375em',
  margin: '1.25rem 0',
  display: 'block',
  width: '100%',
  padding: '26px 14px',
  fontFamily: 'Inter,sans-serif,-apple-system,BlinkMacSystemFont',
  fontWeight: '400',
  fontSize: '1rem',
  lineHeight: '1.4375em',
  letterSpacing: '0.15px',
  color: 'rgba(234, 234, 255, 0.87)',
  colorScheme: 'dark'
}

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  serviceId: string | null
}

interface IFile {
  // Define other properties of the file object here
  file?: {
    file?: {
      id: string | any
      // Define other properties of the file here
    }
  }
  fileId?: string | any
  visibility?: string
}

const Header = styled(Box)<BoxProps>(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: spacing(5, 10),
  justifyContent: 'space-between',
  borderBottom: 1
}))

const LiveSDKDrawer = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, serviceId } = props

  const {
    palette: {
      customColors: { themeColor }
    }
  } = useTheme()

  // // ** Hooks
  const {
    form: { control, reset, handleSubmit },
    store,
    addVideo
  } = useCourses(null)

  const [startAt, setStartAt] = React.useState('')

  // // const methods = useForm()

  const onSubmit = async (data: any) => {
    delete data.subtitles
    data.startAt = new Date(startAt)
    // data.startAt = new Date(data.startAt)
    await addVideo(data)
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
      sx={{ '& .MuiDrawer-paper': { width: '50%' }, marginX: 10 }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>
          <Typography variant='h6'>{!serviceId ? 'Add Video' : 'Update Video'}</Typography>
          <Box>
            <Close fontSize='medium' onClick={handleClose} sx={{ cursor: 'pointer' }} />
          </Box>
        </Header>
        <Grid container>
          <Grid item xs={12} sx={{ padding: 5, mt: 10 }}>
            <InputField
              name='title'
              label='Title (required)'
              placeholder='Title'
              rows={3}
              type='text-area'
              control={control}
            />
            <InputField
              sx={{ marginTop: 5 }}
              name='description'
              label='Description'
              placeholder='Tell viewers about your video'
              type='text-area'
              rows={5}
              control={control}
            />
            <input
              style={inputStyle}
              type='datetime-local'
              id='birthdaytime'
              name='birthdaytime'
              onChange={e => setStartAt(e.target.value)}
              required
            />
          </Grid>
          <Grid sx={{ padding: 5 }} textAlign={'start'}>
            <Typography variant='h6' fontSize={'19px'}>
              Thumbnail
            </Typography>
            <Typography component={'p'} fontSize={'15px'}>
              Select or upload a picture that shows what's in your content. A good thumbnail stands out and draws
              viewers' attention.{' '}
              <Box component={'span'} color={themeColor}>
                Learn more
              </Box>
            </Typography>
          </Grid>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} paddingBottom={'12px'}>
              <Box sx={{ flexGrow: 1, margin: 10 }}>
                <FileUploaderRestrictions
                  name='thumbnail_url'
                  accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }}
                  maxFiles={1}
                  maxSize={10000000}
                  minSize={1}
                  control={control}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <LoadingButton
          loading={store.status === 'pending'}
          disabled={store.status === 'pending'}
          sx={{
            display: 'block',
            margin: 'auto',
            width: '141px'
          }}
          variant='contained'
          color='primary'
          type='submit'
        >
          Create
        </LoadingButton>
      </form>
    </Drawer>
  )
}

export default LiveSDKDrawer
