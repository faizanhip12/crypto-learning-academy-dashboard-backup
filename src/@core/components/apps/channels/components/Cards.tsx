import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Link from 'next/link'
import { Stack } from '@mui/system'
import { DeleteOutline, DotsVertical, ImageEdit } from 'mdi-material-ui'
import { Menu, MenuItem, Box, Skeleton, Grid, Tooltip } from '@mui/material'
import { useChannels } from 'src/@core/hooks/apps/useChannels'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import DeleteAlert from 'src/@core/components/common/deleteAlert'
import CheckIcon from '@mui/icons-material/Check'
import { formatDistanceToNow } from 'date-fns'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import DataNotFound from './DataNotFound'
import LoadingButton from '@mui/lab/LoadingButton'
import { useAuth } from 'src/hooks/useAuth'
import { ModalType } from 'src/types'
import { textOverflow } from 'src/@core/helper/text'
import { IChannels } from 'src/types/apps/channels'
import { useTheme } from '@mui/material/styles'
import { numFormatter } from 'src/@core/components/numFormatter'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : theme.palette.customColors.white,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary
}))

export default function Cards() {
  const { getAllChannels, store, subscribeChannelsById } = useChannels(null)
  const {
    palette: {
      customColors: { lightgrey, white }
    }
  } = useTheme()

  const [status, setStatus] = React.useState('')
  const { handleDrawer, handleModal } = useToggleDrawer()

  const RowOptions = ({ id }: { id: string }) => {
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
      handleModal(id, ModalType.CHANNEL)
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
        <DeleteAlert title='client' onAgree={handleDelete} />
      </>
    )
  }

  React.useEffect(() => {
    getAllChannels({ query: '' })
  }, [])

  const { user } = useAuth()

  const channelSubscription = async (id: any) => {
    setStatus(id)
    const { statusCode } = await subscribeChannelsById(id, 'ALL')
    if (statusCode === '10000') {
      setStatus((prevState: any) => ({
        ...prevState,
        [id]: false
      }))
    }
  }

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
      {store.status === 'success' && !store.entities.length ? (
        <DataNotFound />
      ) : store.status === 'pending' ? (
        <Skeleton variant='rectangular' width={'100%'} height={'80vh'} />
      ) : (
        store?.entities?.map((cards: IChannels) => {
          return (
            <Grid item xs={12} md={3} sm={6} key={cards.id}>
              <Item
                sx={{
                  maxWidth: '100%',
                  float: 'none',
                  mr: 0,
                  mb: 2,
                  position: 'relative'
                }}
              >
                <Card>
                  {cards?.thumnail_url === '' || cards?.thumnail_url === undefined || cards?.thumnail_url === null ? (
                    <Image
                      src={'/images/pages/404image.jpg'}
                      width='600px'
                      height='250px'
                      alt='Video Image'
                      objectFit='cover'
                    />
                  ) : (
                    <Image src={cards?.thumnail_url} width='600px' height='250px' alt='Video Image' objectFit='cover' />
                  )}
                  <CardContent sx={{ position: 'relative' }}>
                    <Stack direction='row' height='40px' alignItems='center' sx={{ cursor: 'pointer' }}>
                      <Link href={`channels/${cards?.id}`}>
                        <Tooltip title={`Click to view the detail of ${textOverflow(cards.name, 20)} channel`}>
                          <Typography variant='body1' color={white} mr='10px' lineHeight='20px'>
                            {textOverflow(cards?.name as string, 20)}
                          </Typography>
                        </Tooltip>
                      </Link>
                      <Box marginLeft={'auto'}>
                        {user?.id === cards?.userId ? <RowOptions id={cards?.id as string} /> : null}
                      </Box>
                    </Stack>
                    <Typography variant='body2' color={lightgrey} marginBottom={5} height={'20px'}>
                      {cards?.subscriber?.length > 1
                        ? numFormatter(cards?.subscriber?.length) + ' Subscribers'
                        : numFormatter(cards?.subscriber?.length) + ' Subscriber'}{' '}
                      - {formatDistanceToNow(new Date(cards?.createdAt), { addSuffix: true })}
                    </Typography>
                    <Tooltip
                      title={`Click to ${cards?.isSubscribed ? 'unsubscribe' : 'subscribe'} to ${textOverflow(
                        cards?.name,
                        20
                      )}`}
                    >
                      <LoadingButton
                        loading={status === cards.id}
                        disabled={status === cards.id}
                        loadingPosition='end'
                        variant='contained'
                        color={cards?.isSubscribed ? 'success' : 'primary'}
                        sx={{
                          display: 'flex',
                          margin: 'auto',
                          width: '200px'
                        }}
                        onClick={() => channelSubscription(cards?.id)}
                        endIcon={cards?.isSubscribed ? <CheckIcon color='success' /> : null}
                      >
                        {cards?.isSubscribed ? 'Subscribed' : 'Subscribe'}
                      </LoadingButton>
                    </Tooltip>
                  </CardContent>
                </Card>
              </Item>
            </Grid>
          )
        })
      )}
    </Grid>
  )
}
