// ** React Imports
import { Fragment, ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Badge from '@mui/material/Badge'
import MuiAvatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import FormGroup from '@mui/material/FormGroup'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import BlockHelper from 'mdi-material-ui/BlockHelper'
import StarOutline from 'mdi-material-ui/StarOutline'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import PhoneOutline from 'mdi-material-ui/PhoneOutline'
import ImageOutline from 'mdi-material-ui/ImageOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import BookmarkOutline from 'mdi-material-ui/BookmarkOutline'
import ClockTimeFiveOutline from 'mdi-material-ui/ClockTimeFiveOutline'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Type
import { UserProfileRightType } from 'src/types/apps/chatTypes'

// ** Custom Component Imports
import Sidebar from 'src/@core/components/sidebar'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { useTheme } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { deleteChat } from 'src/store/apps/chat'

const UserProfileRight = (props: UserProfileRightType) => {
  const {
    store,
    hidden,
    statusObj,
    getInitials,
    sidebarWidth,
    userProfileRightOpen,
    handleUserProfileRightSidebarToggle
  } = props

  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return <Box sx={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
    }
  }

  const {
    palette: {
      customColors: {}
    }
  } = useTheme()

  const { user } = useAuth()

  const dispatch = useDispatch<AppDispatch>()

  const otherUsersChat = store?.selectedChat?.participants?.find((participant: any) => participant.userId !== user?.id)

  const deleteSelectedChat = async (id: string) => {
    dispatch(deleteChat(id)).then(({ payload }) => {
      if (payload?.statusCode === '10000') {
        handleUserProfileRightSidebarToggle()
      }
    })
  }

  return (
    <Sidebar
      direction='right'
      show={userProfileRightOpen}
      backDropClick={handleUserProfileRightSidebarToggle}
      sx={{
        zIndex: 9,
        height: '100%',
        width: sidebarWidth,
        borderTopRightRadius: theme => theme.shape.borderRadius,
        borderBottomRightRadius: theme => theme.shape.borderRadius,
        '& + .MuiBackdrop-root': {
          zIndex: 8,
          borderRadius: 1
        }
      }}
    >
      {store && store?.selectedChat ? (
        <Fragment>
          <Box sx={{ position: 'relative' }}>
            <IconButton
              size='small'
              onClick={handleUserProfileRightSidebarToggle}
              sx={{ top: '0.7rem', right: '0.7rem', position: 'absolute', color: 'text.secondary' }}
            >
              <Close sx={{ color: 'action.active' }} />
            </IconButton>
            <Box sx={{ px: 5, pb: 7, pt: 9.5, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
                <Badge
                  overlap='circular'
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  badgeContent={
                    <Box
                      component='span'
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        // TEMP_OFF_CHAT color: `${statusObj[store.selectedChat.contact.status]}.main`,
                        boxShadow: theme => `0 0 0 2px ${theme.palette.background.paper}`
                        // TEMP_OFF_CHAT backgroundColor: `${statusObj[store.selectedChat.contact.status]}.main`
                      }}
                    />
                  }
                >
                  {store.selectedChat?.participants?.length === 2 ? (
                    otherUsersChat?.user?.profile_picture ? (
                      <MuiAvatar
                        sx={{ width: '5rem', height: '5rem' }}
                        src={otherUsersChat?.user?.profile_picture as string}
                        alt={otherUsersChat?.user?.first_name}
                      />
                    ) : (
                      <CustomAvatar
                        skin='light'
                        // color={store.selectedChat.contact.avatarColor}
                        sx={{ width: '5rem', height: '5rem', fontWeight: 500, fontSize: '2rem' }}
                      >
                        {getInitials(`${otherUsersChat?.user?.first_name} ${otherUsersChat?.user?.last_name}`)}
                      </CustomAvatar>
                    )
                  ) : null}
                  {store.selectedChat?.participants?.length > 2 ? (
                    <CustomAvatar
                      skin='light'
                      // color={store.selectedChat.contact.avatarColor}
                      sx={{ width: '5rem', height: '5rem', fontWeight: 500, fontSize: '2rem' }}
                    >
                      {getInitials(`${store.selectedChat?.name}`)}
                    </CustomAvatar>
                  ) : null}
                </Badge>
              </Box>
              <Typography sx={{ mb: 0.75, fontWeight: 600, textAlign: 'center' }}>
                {store?.selectedChat?.participants?.length > 2
                  ? `${store.selectedChat?.name}`
                  : `${otherUsersChat?.user?.first_name} ${otherUsersChat?.user?.last_name}`}
              </Typography>
              <Typography variant='body2' sx={{ textAlign: 'center' }}>
                {store?.selectedChat?.participants?.length > 2 ? `Group` : otherUsersChat?.user?.role?.code}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ height: 'calc(100% - 13.0625rem)' }}>
            <ScrollWrapper>
              <Box sx={{ p: 5 }}>
                <FormGroup sx={{ mb: 6 }}>
                  {/* <Typography variant='body2' sx={{ mb: 1.5, textTransform: 'uppercase' }}>
                    About
                  </Typography>
                  <Typography variant='body2' sx={{ fontSize: '0.875rem' }}>
                    {store.selectedChat.contact.about}
                    ABOUT
                  </Typography> */}
                </FormGroup>

                <Box sx={{ mb: 6 }}>
                  <Typography variant='body2' sx={{ mb: 1.5, textTransform: 'uppercase' }}>
                    Personal Information
                  </Typography>
                  <List dense sx={{ p: 0 }}>
                    {store.selectedChat?.participants?.length > 2 ? null : (
                      <ListItem sx={{ px: 2 }}>
                        <ListItemIcon sx={{ mr: 3 }}>
                          <EmailOutline />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ textTransform: 'lowercase' }}
                          // TEMP_OFF_CHAT secondary={`${store.selectedChat.contact.name.replace(/\s/g, '_')}@email.com`}
                          secondary={`${
                            otherUsersChat?.user?.email ||
                            `${otherUsersChat?.user?.first_name}${otherUsersChat?.user?.last_name}@email.com`
                          }`}
                        />
                      </ListItem>
                    )}
                    {/* <ListItem sx={{ px: 2 }}>
                      <ListItemIcon sx={{ mr: 3 }}>
                        <PhoneOutline />
                      </ListItemIcon>
                      <ListItemText secondary='+1(123) 456 - 7890' />
                    </ListItem>
                    <ListItem sx={{ px: 2 }}>
                      <ListItemIcon sx={{ mr: 3 }}>
                        <ClockTimeFiveOutline />
                      </ListItemIcon>
                      <ListItemText secondary='Mon - Fri 10AM - 8PM' />
                    </ListItem> */}
                  </List>
                </Box>

                <Box>
                  <Typography variant='body2' sx={{ mb: 1.5, textTransform: 'uppercase' }}>
                    Settings
                  </Typography>
                  <List dense sx={{ p: 0 }}>
                    {/* <ListItem disablePadding>
                      <ListItemButton sx={{ px: 2 }}>
                        <ListItemIcon sx={{ mr: 3 }}>
                          <BookmarkOutline />
                        </ListItemIcon>
                        <ListItemText secondary='Add Tag' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton sx={{ px: 2 }}>
                        <ListItemIcon sx={{ mr: 3 }}>
                          <StarOutline />
                        </ListItemIcon>
                        <ListItemText secondary='Important Contact' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton sx={{ px: 2 }}>
                        <ListItemIcon sx={{ mr: 3 }}>
                          <ImageOutline />
                        </ListItemIcon>
                        <ListItemText secondary='Shared Media' />
                      </ListItemButton>
                    </ListItem> */}
                    <ListItem disablePadding>
                      <ListItemButton sx={{ px: 2 }} disabled={store.status === 'pending'}>
                        <ListItemIcon sx={{ mr: 3 }}>
                          <DeleteOutline />
                        </ListItemIcon>
                        <ListItemText
                          secondary='Delete Chat'
                          onClick={() => deleteSelectedChat(store?.selectedChat?.id as string)}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton sx={{ px: 2 }}>
                        <ListItemIcon sx={{ mr: 2.5, ml: 0.5 }}>
                          <BlockHelper fontSize='small' />
                        </ListItemIcon>
                        <ListItemText secondary='Block Contact' />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </ScrollWrapper>
          </Box>
        </Fragment>
      ) : null}
    </Sidebar>
  )
}

export default UserProfileRight
