import * as React from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'

// ** Third Party Imports
import { useReview } from 'src/@core/hooks/apps/useReview'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Types Imports
import { Divider, FormControl, Rating, TextareaAutosize } from '@mui/material'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import { renderClient } from 'src/@core/components/common/renderClient'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  serviceId: string | null
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const ReviewComp = () => {
  // ** Props
  //   const { open, toggle, serviceId } = props
  const theme = useTheme()
  const {
    query: { id }
  } = useRouter()

  // ** Hooks
  const {
    form: {
      control,
      reset,
      handleSubmit,
      formState: { errors }
      // setValue
    },
    addReview,
    updateReview,
    store
  } = useReview(null)

  return (
    <Box sx={{ '& .MuiDrawer-paper': { width: 700 }, background: 'transparent' }}>
      <Header>
        <Typography variant='h6'>Reviews</Typography>
        {/* <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} /> */}
      </Header>
      {!store?.reviews?.length ? (
        <Typography variant='h5' textAlign={'center'} mt={10}>
          No Reviews Found
        </Typography>
      ) : (
        store?.reviews?.map((item: any, index: number) => {
          return (
            <React.Fragment key={index}>
              <Divider sx={{ mt: 0, mb: 1, width: '100%', marginTop: 10 }} />
              <Box sx={{ display: 'flex', p: 7 }}>
                {renderClient(item?.user?.profile_picture, item?.user?.first_name + ' ' + item?.user?.last_name)}
                <Box marginTop={'2px'}>
                  <Typography fontSize={'15px'}>
                    {item?.user?.first_name + ' ' + item?.user?.last_name || 'Not Found'}
                  </Typography>
                  <Rating name='half-rating-read' defaultValue={item?.reviews} precision={0.5} readOnly />
                </Box>
              </Box>
              <Box display={'flex'} justifyContent={'center'} width={'100%'}>
                <FormControl variant='standard' sx={{ width: '100%', marginX: 7, mb: 5 }}>
                  {/* @ts-ignore */}
                  <TextareaAutosize
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      height: '100px',
                      borderRadius: '5px',
                      minHeight: '70px',
                      minWidth: '100%',
                      padding: '10px',
                      maxWidth: '100%',
                      color: theme.palette.customColors.white,
                      fontSize: '16px',
                      lineHeight: '1.4',
                      overflowY: 'scroll',
                      width: '100%'
                    }}
                    defaultValue={item?.description}
                    value={item?.description}
                    disabled
                  />
                </FormControl>
              </Box>
            </React.Fragment>
          )
        })
      )}
    </Box>
  )
}

export default ReviewComp
