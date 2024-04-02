import * as React from 'react'
import { BoxProps } from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Close from 'mdi-material-ui/Close'
import { Button, Grid, styled } from '@mui/material'
import Image from 'next/image'
import Rating from '@mui/material/Rating'
import InputField from 'src/@core/components/form/InputField'
import LoadingButton from '@mui/lab/LoadingButton'
import { useReview } from 'src/@core/hooks/apps/useReview'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  serviceId: string | null
}

const ModalWrapper = styled('div')<BoxProps>(({ theme }) => ({
  position: 'absolute' as 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '35%',
  background: theme.palette.customColors.modal,
  textAlign: 'center',
  margin: '5% auto',
  borderRadius: '20px',
  padding: '50px',
  backgroundColor: 'black',
  [`${theme.breakpoints.down('xl')}`]: {
    width: '50%',
    height: 'auto',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  [`${theme.breakpoints.down('lg')}`]: {
    width: '60%',
    height: 'auto',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '30px 20px'
  },
  [`${theme.breakpoints.down('sm')}`]: {
    width: '80%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '25px 15px'
  }
}))

const FlexBox = styled('div')<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  justifyContent: 'center',
  gap: '10px',
  textAlign: 'center',
  alignItems: 'center',
  [`${theme.breakpoints.down('md')}`]: {
    gap: '5px'
  }
}))

const BlackText = styled('text')<BoxProps>(({ theme }) => ({
  color: theme.palette.customColors.white,
  fontSize: 36,
  fontStyle: 'normal',
  fontWeight: '700',
  lineHeight: '40px',
  [`${theme.breakpoints.down('md')}`]: {
    fontSize: '24px',
    lineHeight: '30px'
  }
}))

const ModalCustom = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle } = props

  // Hooks
  const [value, setValue] = React.useState<number | null>(2)
  const { isDrawerOpen } = useToggleDrawer()

  const { user } = useAuth()

  React.useEffect(() => {
    if (!isDrawerOpen) {
      setValue(2)
      setFormValue('description', '')
    }
  }, [!isDrawerOpen])

  const {
    form: { control, handleSubmit, setValue: setFormValue },
    addReview,
    getAllReviewsByPlaylistId,
    store
  } = useReview(null)

  const {
    query: { id }
  } = useRouter()

  // Functions
  const handleClose = () => {
    // reset()
    toggle()
  }

  const onSubmit = async (body: any) => {
    body.reviews = value
    body.playListId = id
    const { payload }: any = await addReview(body)
    if (payload?.statusCode === '10000') {
      getAllReviewsByPlaylistId(id as any)
      handleClose()
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalWrapper>
          <FlexBox>
            <BlackText>Rate us</BlackText>
            <Close
              fontSize='small'
              onClick={handleClose}
              sx={{ cursor: 'pointer', position: 'absolute', top: ' 10px', right: '10px' }}
            />

            <Image
              src={user?.profile_picture || '/images/avatars/1.png'}
              alt='user'
              width={117}
              height={117}
              style={{ borderRadius: '50%', margin: '0 auto !important' }}
            />
            <BlackText sx={{ fontSize: '22px' }}>{user?.first_name + ' ' + user?.last_name}</BlackText>

            <Rating
              style={{
                marginBottom: 20,
                marginTop: 20
              }}
              name='hover-feedback'
              value={value}
              precision={0.5}
              onChange={(event, newValue) => {
                setValue(newValue)
              }}
            />

            <InputField
              name='description'
              label='Description'
              placeholder='Enter Description'
              type='text-area'
              rows={5}
              control={control}
              required
            />
            <Grid container justifyContent={'center'} gap={3}>
              <Grid item>
                <Button sx={{ minWidth: '150px' }} size='large' variant='outlined' onClick={handleClose}>
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <LoadingButton
                  loading={store?.status === 'pending'}
                  disabled={store?.status === 'pending'}
                  loadingPosition='end'
                  sx={{ minWidth: '150px' }}
                  size='large'
                  variant='contained'
                  type='submit'
                  color='primary'
                >
                  Post
                </LoadingButton>
              </Grid>
            </Grid>
          </FlexBox>
        </ModalWrapper>
      </form>
    </Modal>
  )
}

export default ModalCustom
