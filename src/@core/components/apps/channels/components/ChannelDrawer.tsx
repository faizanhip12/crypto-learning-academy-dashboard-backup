import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import { useChannels } from 'src/@core/hooks/apps/useChannels'
import FileUploaderRestrictions from './FileUploader'
import { InputField } from 'src/@core/components/form'
import { Grid, FormLabel } from '@mui/material'
import FormCheckbox from 'src/@core/components/form/Checkbox'
import { Close } from 'mdi-material-ui'
import LoadingButton from '@mui/lab/LoadingButton'
import { useTheme } from '@mui/material/styles'

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

const ChannelDrawer = (props: SidebarAddUserType) => {
  const { open, toggle, serviceId } = props

  const {
    palette: {
      customColors: { themeColor },
      error: { main }
    }
  } = useTheme()

  const {
    form: {
      control,
      handleSubmit,
      formState: {
        errors: { thumnail_url }
      },
      reset
    },
    addChannel,
    store,
    getAllChannels,
    updateChannelById
  } = useChannels(serviceId)

  const onSubmit = async (body: any) => {
    if (body.isAgreed == undefined) {
      body.isAgreed = false
    } else if (!body?.introVideo) {
      delete body?.introVideo
    }
    if (serviceId) {
      await updateChannelById(serviceId, body)
    } else {
      const { statusCode } = await addChannel(body)
      if (statusCode === '10000') {
        getAllChannels({ query: '' })
      }
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
      sx={{ '& .MuiDrawer-paper': { width: 800 } }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>
          <Typography variant='h6'>{!serviceId ? 'Create Channel' : 'Update Channel'}</Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ padding: 5 }}>
          <Grid container spacing={10}>
            <Grid item xs={12} sm={12}>
              <InputField name='name' label='Channel Name' placeholder='Enter Name' control={control} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputField name='slug' label='Channel Slug' placeholder='Enter Slug' control={control} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputField
                type='text-area'
                rows={6}
                fullWidth
                name='about'
                label='Channel About'
                placeholder='Enter About'
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormLabel sx={{ display: 'block', marginBottom: 2 }}>Video Thumbnail</FormLabel>
              <FileUploaderRestrictions
                name='thumnail_url'
                accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }}
                maxFiles={1}
                maxSize={10000000}
                minSize={1}
                control={control}
              />
              {thumnail_url && (
                <Typography mt={2} fontWeight={'400'} color={main} fontSize={'0.75rem'}>
                  {thumnail_url?.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormLabel sx={{ display: 'block', marginBottom: 2 }}>Intro Video</FormLabel>
              <FileUploaderRestrictions
                name='intro_video'
                accept={{ 'video/*': ['.mp4'] }}
                maxFiles={1}
                maxSize={10000000}
                minSize={1}
                control={control}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} sm={12}>
            <Grid item xs={12} display={'flex'} alignItems='center'>
              <FormCheckbox control={control} name='isAgreed' />
              <Typography
                component={'p'}
                textAlign={'left'}
                lineHeight={1.3}
                fontSize={14}
                sx={{ width: '100%', mt: 5 }}
              >
                <Box component='span' color={themeColor}>
                  Term & Conditions
                </Box>{' '}
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries,
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} textAlign={'center'}>
            <LoadingButton
              loading={store.status === 'pending'}
              disabled={store.status === 'pending'}
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

export default ChannelDrawer
