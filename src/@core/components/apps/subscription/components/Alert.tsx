// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

import { ModalType } from 'src/types'

const SubscriptionAlert = ({
  title = 'records',
  type = ModalType.SUBSCRIPTION,
  onAgree
}: {
  title?: string
  onAgree: () => void
  type?: ModalType
}) => {
  // ** hooks
  const { isModalOpen, handleModal, modalType } = useToggleDrawer()
  const handleClose = () => handleModal(null, ModalType.SUBSCRIPTION)

  return (
    <Dialog
      open={isModalOpen && modalType === type}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      onClose={() => handleClose()}
    >
      <DialogTitle id='alert-dialog-title'>Are you a {title}?</DialogTitle>
      <DialogContent sx={{ minWidth: 500 }}>
        <DialogContentText id='alert-dialog-description'>You need to subscribe to our plans!</DialogContentText>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Button onClick={() => handleClose()} variant='outlined' color='error'>
          Cancel
        </Button>
        <Button onClick={onAgree} variant='contained'>
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SubscriptionAlert
