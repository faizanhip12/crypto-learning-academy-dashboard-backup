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
import Link from 'next/link'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { add, format } from 'date-fns'

const DeleteAlert = ({
  title = 'records',
  type = ModalType.DEFAULT,
  fullEvent
}: {
  title?: string
  type?: ModalType
  fullEvent: any
}) => {
  // ** hooks
  const { isModalOpen, handleModal, modalType } = useToggleDrawer()
  const handleClose = () => handleModal(null)
  const { push } = useRouter()

  return (
    <Dialog
      open={isModalOpen && modalType === type}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title' minWidth={500}>
        {title}
      </DialogTitle>
      <DialogContent>
        {fullEvent?._def?.extendedProps?.contentType === 'STREAM' ? (
          <>
            <Typography>
              Join This Live Event
              <br />
            </Typography>
            {fullEvent?._instance?.range?.start && (
              <Typography sx={{ marginTop: '10px' }}>
                {'Start at: ' + format(add(new Date(fullEvent?._instance?.range?.start), { days: 7 }), 'p (zzzz)')}
                <br />
              </Typography>
            )}
            <div style={{ textAlign: 'center' }}>
              <Button
                variant='contained'
                color='primary'
                sx={{
                  marginTop: '20px'
                }}
                onClick={() => {
                  push(
                    `/course/${fullEvent?._def?.extendedProps?.playlistId}/video/${fullEvent?._def?.extendedProps?.videoId}`
                  )
                  handleModal(null)
                }}
              >
                Join Meeting
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogContentText id='alert-dialog-description'>{fullEvent?._def?.title}</DialogContentText>
            {fullEvent?._instance?.range?.start && (
              <Typography>
                {'Start at: ' + format(add(new Date(fullEvent?._instance?.range?.start), { days: 7 }), 'p (zzzz)')}
                <br />
              </Typography>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteAlert
