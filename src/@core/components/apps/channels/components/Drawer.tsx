import * as React from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Image from 'next/image'
import Paper from '@mui/material/Paper'

// ** Third Party Imports
import { useChannels } from 'src/@core/hooks/apps/useChannels'
import FileUploaderRestrictions from 'src/@core/components/form/File/FileUploaderRestrictions'

// ** import form support components
import { InputField } from 'src/@core/components/form'

// ** Types Imports
import { Grid } from '@mui/material'
import FormCheckbox from 'src/@core/components/form/Checkbox'
import { useTheme } from '@mui/material/styles'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  serviceId: string | null
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : theme.palette.customColors.white,
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

const ChannelDrawer = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, serviceId } = props

  const {
    palette: {
      customColors: { darkgrey, themeColor }
    }
  } = useTheme()
  // ** Hooks
  const {
    form: {
      control,
      handleSubmit,
      formState: { errors },
      reset
    },
    addChannel
  } = useChannels(null)

  const onSubmit = (body: any) => {
    if (body.isAgreed == undefined) {
      body.isAgreed = false
    }
    addChannel(body)
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
      <form onSubmit={handleSubmit(onSubmit)} style={{ background: darkgrey }}>
        <Grid container spacing={2} mt={10} display={'flex'} alignItems={'flex-end'}>
          <Grid item xs={4}>
            <Item>
              <Typography variant='h6'>Create Your Channel</Typography>
            </Item>
            <Item sx={{ mt: 5 }}>
              {/* <Image src={'/images/avatars/Group.png'} width={'178px'} height={'170px'} alt='channel Image' /> */}
              <Box width={'170px'} height={'170px'}>
                <FileUploaderRestrictions
                  name='thumnail_url'
                  accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }}
                  maxFiles={1}
                  maxSize={10000000}
                  minSize={1}
                  control={control}
                />
              </Box>
            </Item>
            <Item sx={{ mt: 5 }}>
              <Image src={'/images/avatars/QrCode.png'} width={'178px'} height={'170px'} alt='channel Image' />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item sx={{ mb: 8 }}>
              <InputField name='name' label='Channel Name' placeholder='Enter Name' control={control} />
            </Item>
            <Item sx={{ mb: 8 }}>
              <InputField name='slug' label='Channel Slug' placeholder='Enter Slug' control={control} />
            </Item>
            <Item sx={{ mt: 5 }}>
              <InputField
                type='text-area'
                rows={6}
                fullWidth
                name='about'
                label='Channel About'
                placeholder='Enter About'
                control={control}
              />
            </Item>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={10}>
          <Grid item xs={9} display={'flex'}>
            <FormCheckbox control={control} name='isAgreed' />
            <Item>
              <Typography component={'p'} pt={10} textAlign={'left'}>
                <Box component='span' color={themeColor}>
                  Term & Conditions
                </Box>{' '}
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries,
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item sx={{ mt: 12 }}>
              <Button
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
              </Button>
            </Item>
          </Grid>
        </Grid>
      </form>
    </Drawer>
  )
}

export default ChannelDrawer
