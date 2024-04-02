// ** React Imports
import { useState, useEffect, ChangeEvent, ReactNode, useContext } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Redux
import { useDispatch } from 'react-redux'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Chip from '@mui/material/Chip'
import Badge from '@mui/material/Badge'
import Drawer from '@mui/material/Drawer'
import { Theme } from '@mui/material/styles'
import MuiAvatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import Magnify from 'mdi-material-ui/Magnify'

// ** Types
import { ContactType, ChatSidebarLeftType, ChatsArrType, ChatsObj, Chat } from 'src/types/apps/chatTypes'

// ** Custom Components Import
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Chat App Components Imports
import UserProfileLeft from 'src/views/apps/chat/UserProfileLeft'
import { Button } from '@mui/material'
import ChatDrawer from 'src/@core/components/apps/chats/Drawer'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import ChatName from 'src/views/apps/chat/ChatName'
import ChatProfile from 'src/views/apps/chat/ChatProfile'

// ** Context
import { SocketContext } from 'src/context/SocketContext'
import { useAuth } from 'src/hooks/useAuth'

// ** Redux action
import { appChatSlice, startConversation } from 'src/store/apps/chat'
import { useForm } from 'react-hook-form'
import { renderClient } from 'src/@core/components/common/renderClient'

const ScrollWrapper = ({ children, hidden }: { children: ReactNode; hidden: boolean }) => {
  if (hidden) {
    return <Box sx={{ height: '100%', overflow: 'auto' }}>{children}</Box>
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
  }
}

const SidebarLeft = (props: ChatSidebarLeftType) => {
  // ** Props
  const {
    store,
    hidden,
    mdAbove,
    dispatch,
    statusObj,
    userStatus,
    selectChat,
    getInitials,
    sidebarWidth,
    setUserStatus,
    leftSidebarOpen,
    removeSelectedChat,
    userProfileLeftOpen,
    formatDateToMonthShort,
    handleLeftSidebarToggle,
    handleUserProfileLeftSidebarToggle
  } = props

  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()
  const { socket } = useContext(SocketContext)
  const { user } = useAuth()
  // const appDispatch = useDispatch()

  // ** States
  const [query, setQuery] = useState<string>('')
  const [filteredChat, setFilteredChat] = useState<ChatsArrType[]>([])
  const [filteredContacts, setFilteredContacts] = useState<ContactType[]>([])
  const [active, setActive] = useState<null | { type: string; id: string | number }>(null)

  // ** Hooks
  const router = useRouter()

  const handleChatClick = (type: 'chat' | 'contact', chat: ChatsObj | any) => {
    socket.emit('LEAVE_CHAT_ROOM')
    if (type === 'chat') {
      socket.emit('JOIN_CHAT_ROOM', JSON.stringify({ id: chat?.id, userId: user?.id }))
      dispatch(startConversation(chat?.id))
    }
    dispatch(selectChat(chat))
    setActive({ type, id: chat.id })
    if (!mdAbove) {
      handleLeftSidebarToggle()
    }
  }

  useEffect(() => {
    if (store && store.chats) {
      // if (active !== null) {
      //   if (active.type === 'contact' && active.id === store.chats[0].id) {
      //     setActive({ type: 'chat', id: active.id })
      //   }
      // } // TEMP_OFF_CHAT
    }
  }, [store, active])

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      setActive(null)
      dispatch(removeSelectedChat())
    })

    return () => {
      setActive(null)
      dispatch(removeSelectedChat())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hasActiveId = (id: number | string) => {
    // if (store.chats !== null) {
    //   const arr = store.chats?.filter(i => i.id === id)
    //   return !!arr.length
    // } // TEMP_OFF_CHAT
  }

  // const startConversation = (contact: any) => {
  //   // console.log(contact)
  // }

  const renderChats = () => {
    if (store && store?.chats && store?.chats?.length) {
      if (query?.length && !filteredChat?.length) {
        return (
          <ListItem>
            <Typography sx={{ color: 'text.secondary' }}>No Chats Found</Typography>
          </ListItem>
        )
      } else {
        const arrToMap: any = store?.chats
        return arrToMap?.map((chat: Chat | any, index: number) => {
          const activeCondition = active !== null && active?.id === chat?.id && active?.type === 'chat'
          return (
            <ListItem key={index} disablePadding sx={{ '&:not(:last-child)': { mb: 1.5 } }}>
              <ListItemButton
                disableRipple
                onClick={() => handleChatClick('chat', chat)}
                sx={{
                  px: 2.5,
                  py: 2.5,
                  width: '100%',
                  borderRadius: 1,
                  alignItems: 'flex-start',
                  backgroundColor: (theme: Theme) => (activeCondition ? `${theme.palette.primary.main} !important` : '')
                }}
              >
                {user && chat && (
                  <ChatProfile
                    statusObj={statusObj}
                    chat={chat}
                    user={user}
                    activeCondition={activeCondition}
                    getInitials={getInitials}
                  />
                )}
                {user && chat && <ChatName chat={chat} user={user} activeCondition={activeCondition} />}
              </ListItemButton>
            </ListItem>
          )
        })
      }
    }
  }

  const renderContacts = () => {
    if ((store && store.chats && store.chats.length) || true) {
      if (query.length && !filteredContacts.length) {
        return (
          <ListItem>
            <Typography sx={{ color: 'text.secondary' }}>No Contacts Found</Typography>
          </ListItem>
        )
      } else {
        const arrToMap = query.length && filteredContacts.length ? filteredContacts : store.contacts
        return arrToMap !== null
          ? arrToMap.map((contact: ContactType | any, index: number) => {
              const activeCondition = active !== null && active.id === contact.id && active.type === 'contact' // && !hasActiveId(contact.id) // TEMP_OFF_CHAT
              return (
                <ListItem
                  key={index}
                  disablePadding
                  sx={{ '&:not(:last-child)': { mb: 1.5 } }}
                  // onClick={() => startConversation(contact)}
                >
                  <ListItemButton
                    disableRipple
                    // onClick={() => handleChatClick(hasActiveId(contact.id) ? 'chat' : 'contact', contact.id)} // TEMP_OFF_CHAT
                    onClick={() => handleChatClick('contact', contact)}
                    sx={{
                      px: 2.5,
                      py: 2.5,
                      width: '100%',
                      borderRadius: 1,
                      backgroundColor: (theme: Theme) =>
                        activeCondition ? `${theme.palette.primary.main} !important` : ''
                    }}
                  >
                    <ListItemAvatar sx={{ m: 0 }}>
                      {contact.profile_picture ? (
                        <MuiAvatar
                          alt={contact.fullName}
                          src={contact.profile_picture}
                          sx={{
                            width: 40,
                            height: 40,
                            border: (theme: Theme) => (activeCondition ? `2px solid ${theme.palette.common.white}` : '')
                          }}
                        />
                      ) : (
                        <CustomAvatar
                          color={contact.avatarColor}
                          skin={activeCondition ? 'light-static' : 'light'}
                          sx={{
                            width: 40,
                            height: 40,
                            fontSize: '1rem',
                            border: (theme: Theme) => (activeCondition ? `2px solid ${theme.palette.common.white}` : '')
                          }}
                        >
                          {getInitials(contact.fullName)}
                        </CustomAvatar>
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ my: 0, ml: 4, '& .MuiTypography-root': { color: activeCondition ? 'common.white' : '' } }}
                      primary={
                        <Typography sx={{ ...(!activeCondition ? { color: 'text.secondary' } : {}) }}>
                          {contact.fullName || 'Full Name'}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          noWrap
                          variant='body2'
                          sx={{ color: !activeCondition ? (theme: Theme) => theme.palette.text.disabled : {} }}
                        >
                          {contact.about || 'About'}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              )
            })
          : null
      }
    }
  }

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    if (store.chats !== null && store.contacts !== null) {
      const searchFilterFunction = (contact: ChatsArrType | ContactType) =>
        contact.fullName.toLowerCase().includes(e.target.value.toLowerCase())
      const filteredChatsArr = store?.chats?.filter(searchFilterFunction)
      const filteredContactsArr = store?.contacts?.filter(searchFilterFunction)
      setFilteredChat(filteredChatsArr)
      setFilteredContacts(filteredContactsArr)
    }
  }

  return (
    <>
      <Box>
        <Drawer
          open={leftSidebarOpen}
          onClose={handleLeftSidebarToggle}
          variant={mdAbove ? 'permanent' : 'temporary'}
          ModalProps={{
            disablePortal: true,
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            zIndex: 7,
            height: '100%',
            display: 'block',
            position: mdAbove ? 'static' : 'absolute',
            '& .MuiDrawer-paper': {
              boxShadow: 'none',
              overflow: 'hidden',
              width: sidebarWidth,
              position: mdAbove ? 'static' : 'absolute',
              borderTopLeftRadius: (theme: Theme) => theme.shape.borderRadius,
              borderBottomLeftRadius: (theme: Theme) => theme.shape.borderRadius
            },
            '& > .MuiBackdrop-root': {
              borderRadius: 1,
              position: 'absolute',
              zIndex: (theme: Theme) => theme.zIndex.drawer - 1
            }
          }}
        >
          <Box
            sx={{
              px: 5.5,
              py: 3.5,
              display: 'flex',
              alignItems: 'center',
              borderBottom: (theme: Theme) => `1px solid ${theme.palette.divider}`
            }}
          >
            {store && user ? (
              <Badge
                overlap='circular'
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                sx={{ mr: 4.5, cursor: 'pointer' }}
                onClick={handleUserProfileLeftSidebarToggle}
                badgeContent={
                  <Box
                    component='span'
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      color: `${statusObj[userStatus]}.main`,
                      backgroundColor: `${statusObj[userStatus]}.main`,
                      boxShadow: (theme: Theme) => `0 0 0 2px ${theme.palette.background.paper}`
                    }}
                  />
                }
              >
                {renderClient(user?.profile_picture as string, `${user?.first_name} ${user?.last_name}`)}
              </Badge>
            ) : null}
            <TextField
              fullWidth
              size='small'
              value={query}
              onChange={handleFilter}
              placeholder='Search for contact...'
              sx={{ '& .MuiInputBase-root': { borderRadius: 5 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Magnify fontSize='small' />
                  </InputAdornment>
                )
              }}
            />
            {!mdAbove ? (
              <IconButton sx={{ p: 1, ml: 1 }} onClick={handleLeftSidebarToggle}>
                <Close sx={{ fontSize: '1.375rem' }} />
              </IconButton>
            ) : null}
          </Box>

          <Box sx={{ height: `calc(100% - 4.0625rem)` }}>
            <ScrollWrapper hidden={hidden}>
              <Box sx={{ p: (theme: Theme) => theme.spacing(5, 3, 3) }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant='outlined' onClick={() => handleDrawer(null)}>
                    Create A Group
                  </Button>
                </Box>
                {store.chats?.length > 0 && (
                  <Typography variant='h6' sx={{ ml: 2, mb: 4, mt: 4, color: 'primary.main' }}>
                    Chats
                  </Typography>
                )}
                <List sx={{ mb: 7.5, p: 0 }}>{renderChats()}</List>
                <Typography variant='h6' sx={{ ml: 2, mb: 4, color: 'primary.main' }}>
                  Contacts
                </Typography>
                <List sx={{ p: 0 }}>{renderContacts()}</List>
              </Box>
            </ScrollWrapper>
          </Box>
        </Drawer>
        <UserProfileLeft
          store={store}
          hidden={hidden}
          statusObj={statusObj}
          userStatus={userStatus}
          sidebarWidth={sidebarWidth}
          setUserStatus={setUserStatus}
          userProfileLeftOpen={userProfileLeftOpen}
          handleUserProfileLeftSidebarToggle={handleUserProfileLeftSidebarToggle}
        />
      </Box>
      <ChatDrawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
    </>
  )
}

export default SidebarLeft
