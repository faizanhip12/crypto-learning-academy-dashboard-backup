import * as React from 'react'
import Image from 'next/image'
import {
  Grid,
  Skeleton,
  Card,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  styled,
  CardContent,
  Stack
} from '@mui/material'
import { usePlaylist } from 'src/@core/hooks/apps/usePlaylist'
import { useRouter } from 'next/router'
import DataNotFound from './DataNotFound'
import { textOverflow } from 'src/@core/helper/text'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { ModalType } from 'src/types'
import { DeleteOutline, DotsVertical, ImageEdit } from 'mdi-material-ui'
import { useAuth } from 'src/hooks/useAuth'
import LoadingButton from '@mui/lab/LoadingButton'
import CheckIcon from '@mui/icons-material/Check'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { IPlaylist } from 'src/types/apps/playlist'
import toast from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

interface PlaylistParams {
  id: any
}

const RowOptions = ({ id }: { id: string }) => {
  const { handleModal, handleDrawer } = useToggleDrawer()

  // ** State
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = async () => {
    handleRowOptionsClose()
    handleModal(id, ModalType.COURSE)
  }

  const handleUpdate = () => handleDrawer(id)

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
        <MenuItem onClick={handleUpdate}>
          <ImageEdit fontSize='small' sx={{ mr: 2 }} />
          Edit
        </MenuItem>
      </Menu>
      {/* <DeleteAlert title='client' onAgree={handleDelete} /> */}
    </>
  )
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : theme.palette.customColors.white,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary
}))

export const PlayList = () => {
  const {
    query: { id },
    push
  } = useRouter()

  const { getAllPlaylist, store, enrollInAPlaylist } = usePlaylist(null)

  const {
    palette: {
      customColors: { darkgrey }
    }
  } = useTheme()

  const { user } = useAuth()

  const ability = React.useContext(AbilityContext)

  const params: PlaylistParams = { id }

  React.useEffect(() => {
    getAllPlaylist(params.id)
  }, [])

  const handleEnrollment = async (id: string) => {
    const response = await enrollInAPlaylist({ playlistId: id })

    if (response) {
      getAllPlaylist(params.id)
    }
  }

  return (
    <Grid container rowSpacing={1} justifyContent={'flex-start'}>
      {store.status === 'error' ? (
        <h1>Error</h1>
      ) : store?.status === 'success' ? (
        !store?.entities?.length ? (
          <DataNotFound />
        ) : (
          store?.entities?.map((cards: IPlaylist) => {
            return (
              <Grid item xs={12} md={4} sm={6} lg={4} xl={3} key={cards.id}>
                <Item
                  sx={
                    !cards.isEnrolled &&
                    user?.role?.code === 'STUDENT' &&
                    // @ts-ignore
                    user?.role?.code !== 'SUPER_ADMIN' &&
                    user?.activeChannel?.channel?.id !== cards.channelId
                      ? {
                          maxWidth: '100%',
                          float: 'none',
                          mr: 2,
                          mb: 2,
                          position: 'relative',
                          minWidth: '250px',

                          '&:before': {
                            content: '""',
                            position: 'absolute',
                            width: '50%',
                            height: '50%',
                            backgroundImage: `url('/images/pages/lock.png')`,
                            top: '0',
                            right: '0',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'top right',
                            zIndex: '99'
                          }
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
                >
                  <Card>
                    {cards?.thumbnail === '' || cards?.thumbnail === undefined || cards?.thumbnail === null ? (
                      <Image
                        src={'/images/pages/404image.jpg'}
                        width='600px'
                        height='250px'
                        alt='Video Image'
                        objectFit='cover'
                      />
                    ) : (
                      <Image
                        src={cards?.thumbnail}
                        width='600px'
                        height='250px'
                        alt='Video Image'
                        objectFit={!cards?.isEnrolled ? 'contain' : 'cover'}
                        style={{ cursor: 'pointer', background: darkgrey }}
                        onClick={
                          user?.role?.code === 'STUDENT'
                            ? () => console.log('')
                            : !cards?.videos?.length
                            ? () => toast.error('No Videos Found')
                            : user?.activeChannel?.channel?.id === cards.channelId || user?.role?.code === 'SUPER_ADMIN'
                            ? () => push(`/course/${cards?.id}/video/${cards?.videos[0]?.videoId}`)
                            : () =>
                                push(
                                  `/course/${cards?.id}/video/${
                                    cards?.lastVideo === '' ? cards?.videos[0]?.videoId : cards?.lastVideo
                                  }`
                                )
                        }
                      />
                    )}
                    <CardContent sx={{ position: 'relative' }}>
                      <Stack direction='row' height='40px' alignItems='center' sx={{ cursor: 'pointer' }}>
                        <Typography variant='body2' mr='10px' lineHeight='20px'>
                          {textOverflow(cards?.name, 20)}
                        </Typography>
                        <Box marginLeft={'auto'}>
                          {user?.activeChannel?.channel?.id === cards.channelId ? (
                            <RowOptions id={cards?.id as string} />
                          ) : null}
                        </Box>
                      </Stack>
                      {ability.can('itsHaveAccess', 'enroll-now-btn') && (
                        <LoadingButton
                          loadingPosition='end'
                          variant='contained'
                          color={cards?.isSubscribed ? 'success' : 'primary'}
                          sx={{
                            display: 'flex',
                            margin: 'auto',
                            width: '200px'
                          }}
                          onClick={
                            !cards?.videos?.length
                              ? () => toast.error('No Videos Found')
                              : cards?.isEnrolled && cards?.videos?.length
                              ? () =>
                                  push(
                                    `/course/${cards?.id}/video/${
                                      cards?.lastVideo === '' ? cards?.videos[0]?.videoId : cards?.lastVideo
                                    }`
                                  )
                              : () => handleEnrollment(cards?.id as string)
                          }
                          endIcon={cards?.isSubscribed ? <CheckIcon color='success' /> : null}
                        >
                          {cards?.isEnrolled ? 'View' : 'Enroll Now'}
                        </LoadingButton>
                      )}
                    </CardContent>
                  </Card>
                </Item>
              </Grid>
            )
          })
        )
      ) : (
        <Skeleton variant='rectangular' sx={{ height: '60vh', width: '75vw' }} />
      )}
    </Grid>
  )
}
