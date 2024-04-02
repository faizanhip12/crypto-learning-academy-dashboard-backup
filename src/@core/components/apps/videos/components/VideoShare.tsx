// ** MUI Imports
import Dialog from '@mui/material/Dialog'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { Box, Typography } from '@mui/material'
import { EmailShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share'
import Image from 'next/image'
import { useVideo } from 'src/@core/hooks/apps/useVideo'
import { ModalType } from 'src/types'

const Page = ({
  title = 'records',
  type = ModalType.DEFAULT,
  onAgree
}: {
  title?: string
  onAgree: () => void
  type?: ModalType
}) => {
  // ** hooks
  const { isModalOpen, handleModal, modalType } = useToggleDrawer()
  const { store } = useVideo(null)
  const handleClose = () => handleModal(null)

  return (
    <Dialog
      open={isModalOpen && modalType === type}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <Typography textAlign={'center'} padding={10}>
        Share With Friends And Family
      </Typography>
      <Box
        display={'flex'}
        marginLeft='auto'
        style={{ marginBottom: 15, justifyContent: 'space-evenly', padding: 20, width: '100%' }}
      >
        <WhatsappShareButton
          style={{ marginRight: '10px' }}
          title={'Hey, check this out'}
          url={(store?.entity as any)?.file?.public_source_url}
        >
          <Image
            src='/images/icons/project-icons/whatsappIcon.png'
            width={'36.37px'}
            height='36.37px'
            style={{ cursor: 'pointer' }}
            onClick={handleClose}
          />
        </WhatsappShareButton>
        <LinkedinShareButton
          style={{ marginRight: '10px' }}
          title={'Hey, check this out'}
          url={
            (store?.entity as any)?.file?.public_source_url || 'https://i.ytimg.com/vi/bmiQl7FrLLc/maxresdefault.jpg'
          }
        >
          <Image
            src='/images/icons/project-icons/linkedInIcon.png'
            width={'36.37px'}
            height='36.37px'
            style={{ cursor: 'pointer' }}
            onClick={handleClose}
          />
        </LinkedinShareButton>
        <EmailShareButton
          title={'Hey, check this out'}
          url={
            (store?.entity as any)?.file?.public_source_url || 'https://i.ytimg.com/vi/bmiQl7FrLLc/maxresdefault.jpg'
          }
        >
          <Image
            src='/images/icons/project-icons/emailIcon.png'
            width={'36.37px'}
            height='36.37px'
            style={{ cursor: 'pointer' }}
            onClick={handleClose}
          />
        </EmailShareButton>
      </Box>
    </Dialog>
  )
}

export default Page
