import React, { MouseEvent, useState } from 'react'
import { add, format, formatDistanceToNow } from 'date-fns'

// ** MUI Imports
import {
  CardContent,
  Grid,
  Typography,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  BoxProps,
  IconButtonProps,
  Paper,
  Tooltip
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import Card from '@mui/material/Card'
import { IFile } from 'src/types/apps/file'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { DeleteOutline, DotsVertical } from 'mdi-material-ui'
import { Box } from '@mui/system'
import DeleteAlert from 'src/@core/components/common/deleteAlert'
import LiveIcon from '@mui/icons-material/LiveTv'

// nmh work
import Link from 'next/link'
import { useAuth } from 'src/hooks/useAuth'
import { useVideo } from 'src/@core/hooks/apps/useVideo'
import { ModalType } from 'src/types'
import { textOverflow } from 'src/@core/helper/text'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import { numFormatter } from 'src/@core/components/numFormatter'

const RowOptions = ({ id }: { id: string }) => {
  const { handleModal } = useToggleDrawer()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = async () => {
    handleRowOptionsClose()
    handleModal(id, ModalType.VIDEO)
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <DotsVertical />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem onClick={handleDelete}>
          <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const ThumbnailBox = styled(Box)<BoxProps>(({ theme }) => ({
  cursor: 'pointer',
  position: 'relative'
}))

const LiveThumbnailBox = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  left: 0,
  padding: '4px 10px',
  background: theme.palette.common.black,
  borderRadius: 5,
  lineHeight: 0,
  margin: '10px',
  width: 'auto'
}))

const IconButtonWrapper = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  position: 'absolute',
  right: 0
}))

const VideoCard = ({ video }: IFile) => {
  const theme = useTheme()
  const { user } = useAuth()
  const { serviceId } = useToggleDrawer()
  const { deleteVideo, store } = useVideo(null)

  const {
    query: { id, slug },
    push
  } = useRouter()

  const handleDeleteVideo = () => {
    serviceId && deleteVideo(serviceId)
  }

  return (
    <>
      <Card sx={{ width: '100%' }}>
        <ThumbnailBox
          onClick={() =>
            video?.isLocked && user?.role?.code === 'STUDENT'
              ? console.log('')
              : !video?.isLocked
              ? push(`/course/${id}/video/${video?.id}`)
              : user?.role?.code === 'TEACHER' || user?.role?.code === 'SUPER_ADMIN'
              ? push(`/course/${id}/video/${video?.id}`)
              : console.log('')
          }
        >
          {video.status !== 'UPLOADED' ? (
            <>
              <IconButtonWrapper color='error'>
                <LiveIcon />
              </IconButtonWrapper>
              <LiveThumbnailBox>
                <Typography variant='caption'>
                  Live In
                  <Box component={'span'}> {format(add(new Date(video.startAt), { days: 7 }), 'MMMM dd, yyyy')}</Box>
                  <Box component={'br'} />
                  <Box component={'span'}> {format(add(new Date(video.startAt), { days: 7 }), 'p (zzzz)')}</Box>
                </Typography>
              </LiveThumbnailBox>
            </>
          ) : null}
          {video?.thumbnail_url === '' || video?.thumbnail_url === null || video?.thumbnail_url === undefined ? (
            <CardMedia component='img' image={'/images/pages/404image.jpg'} width={'100%'} height={200} />
          ) : (
            <>
              <CardMedia
                component='img'
                image={video?.thumbnail_url}
                width={'100%'}
                height={200}
                sx={
                  video?.isLocked
                    ? {
                        maxWidth: '100%',
                        float: 'none',
                        mr: 2,
                        mb: 2,
                        position: 'relative',
                        minWidth: '250px'
                      }
                    : {
                        maxWidth: '100%',
                        float: 'none',
                        mr: 2,
                        mb: 2,
                        position: 'relative',
                        minWidth: '250px'
                      }
                }
              />
              {video?.isLocked && user?.role?.code === 'STUDENT' ? (
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url('/images/pages/lock.png')`,
                    top: '0',
                    right: '0',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top right'
                  }}
                />
              ) : null}
            </>
          )}
        </ThumbnailBox>
        <CardContent
          sx={{ background: theme.palette.linear_gradient.cardGradient }}
          style={
            slug === video.id ? { borderTop: `2px solid ${theme.palette.customColors.themeColor}` } : { border: 'none' }
          }
        >
          <Grid container>
            <Grid item xs={10}>
              <Typography
                sx={{
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  lineHeight: '20px',
                  height: '25px'
                }}
              >
                {textOverflow(video?.title, 25)}
              </Typography>
              <Link href={`/channels/${video?.channel?.id}`}>
                <Box display={'flex'}>
                  <Typography sx={{ cursor: 'pointer', mt: 0, mb: 2 }}>
                    {textOverflow(video?.channel?.name, 15)}
                  </Typography>
                  <CheckIcon
                    sx={{
                      mt: '6px',
                      width: '12px',
                      height: '12px',
                      background: theme.palette.customColors.grey,
                      ml: 1,
                      borderRadius: '50%'
                    }}
                  />
                </Box>
              </Link>
              <Typography variant='body2' fontSize='11px'>
                {numFormatter(video?.views?.length)} views -{' '}
                {formatDistanceToNow(new Date(video?.createdAt), { addSuffix: true })}
              </Typography>
            </Grid>
            {user?.activeChannel?.channel?.id === video.channelId ? (
              <Grid item xs={2}>
                <Box component={'div'} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <RowOptions id={video.id} />
                </Box>
              </Grid>
            ) : null}
          </Grid>
        </CardContent>
      </Card>
      <DeleteAlert title='Video' type={ModalType.VIDEO} onAgree={handleDeleteVideo} />
    </>
  )
}

export default VideoCard
