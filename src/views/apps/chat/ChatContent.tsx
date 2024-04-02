// ** React Imports
import { useState, SyntheticEvent, Fragment, useEffect } from 'react'

// ** MUI Imports
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import MuiAvatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'

// ** Icons Imports
import MenuIcon from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'
import PhoneOutline from 'mdi-material-ui/PhoneOutline'
import VideoOutline from 'mdi-material-ui/VideoOutline'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import MessageOutline from 'mdi-material-ui/MessageOutline'

// ** Custom Components Import
import ChatLog from './ChatLog'
import SendMsgForm from 'src/views/apps/chat/SendMsgForm'
import CustomAvatar from 'src/@core/components/mui/avatar'
import UserProfileRight from 'src/views/apps/chat/UserProfileRight'
import io from 'socket.io-client'

// ** Types
import { ChatContentType } from 'src/types/apps/chatTypes'
import { Button } from '@mui/material'
import { chatService } from 'src/services'
import { useAuth } from 'src/hooks/useAuth'
import {
  conversationStart,
  deleteChat,
  fetchChatsContacts,
  startConversation,
  removeSelectedChat
} from 'src/store/apps/chat'
import ChatName from './ChatName'
import LoadingButton from '@mui/lab/LoadingButton'
import FallbackSpinner from 'src/@core/components/spinner'

// ** Styled Components
const ChatWrapperStartChat = styled(Box)<BoxProps>(({ theme }) => ({
  flexGrow: 1,
  height: '100%',
  display: 'flex',
  borderRadius: 1,
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.action.hover
}))

const ChatContent = (props: ChatContentType) => {
  // ** Props
  const {
    store,
    sendMsg,
    hidden,
    mdAbove,
    dispatch,
    statusObj,
    getInitials,
    sidebarWidth,
    userProfileRightOpen,
    handleStartConversation,
    handleLeftSidebarToggle,
    handleUserProfileRightSidebarToggle
  } = props

  const { user } = useAuth()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget as HTMLElement)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // const handleStartConversation = () => {
  //   console.log('HERE')
  //   if (!mdAbove) {
  //     handleLeftSidebarToggle()
  //   }
  // }

  const selectedChatConversation = async () => {
    const selectedChat = store?.selectedChat
    const { payload }: any = await dispatch(conversationStart({ name: 'ONE_TO_ONE', participants: [selectedChat?.id] }))
    if (payload?.statusCode === '10000') {
      // @ts-ignore
      dispatch(fetchChatsContacts())
      dispatch(removeSelectedChat())
    }
  }

  // const deleteSelectedChat = async (id: string) => {
  //   dispatch(deleteChat(id))
  // }

  const renderContent = () => {
    if (store) {
      const selectedChat = store?.selectedChat
      const myChat = selectedChat?.participants?.find((participant: any) => participant.userId === user?.id)
      const otherUsersChat = selectedChat?.participants?.find((participant: any) => participant.userId !== user?.id)
      if (!myChat || !selectedChat) {
        return (
          <>
            {!mdAbove && (
              <Box sx={{ display: 'flex', alignItems: 'start', padding: 5 }}>
                <IconButton onClick={handleLeftSidebarToggle} sx={{ mr: 2, background: '#fff' }}>
                  <MenuIcon color='primary' />
                </IconButton>
              </Box>
            )}
            <ChatWrapperStartChat
              sx={{
                ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
              }}
            >
              <MuiAvatar
                sx={{
                  mb: 5,
                  pt: 8,
                  pb: 7,
                  px: 7.5,
                  width: 110,
                  height: 110,
                  backgroundColor: 'background.paper',
                  boxShadow: (theme: any) => theme.shadows[3]
                }}
              >
                <MessageOutline sx={{ width: 50, height: 50, color: 'action.active' }} />
              </MuiAvatar>
              {selectedChat ? (
                <LoadingButton
                  disabled={store.status === 'pending'}
                  loading={store.status === 'pending'}
                  variant='text'
                  sx={{
                    px: 6,
                    py: 2.25,
                    borderRadius: 5,
                    backgroundColor: 'background.paper',
                    boxShadow: (theme: any) => theme.shadows[3],
                    cursor: 'pointer'
                  }}
                  onClick={() => selectedChatConversation()}
                >
                  Say, Hi 👋
                </LoadingButton>
              ) : null}
              {/* <LoadingButton
                  variant='text'
                  sx={{
                    px: 6,
                    py: 2.25,
                    borderRadius: 5,
                    backgroundColor: 'background.paper',
                    boxShadow: (theme: any) => theme.shadows[3],
                    cursor: 'unset'
                  }}
                >
                  Start Conversation
                </LoadingButton> */}
            </ChatWrapperStartChat>
          </>
        )
      } else if (store.status === 'pending') {
        return (
          <>
            <Box sx={{ display: 'flex', alignItems: 'start', padding: 5 }}></Box>
            <ChatWrapperStartChat>
              <FallbackSpinner />
            </ChatWrapperStartChat>
          </>
        )
      } else {
        return (
          <Box
            sx={{
              flexGrow: 1,
              width: '100%',
              height: '100%',
              backgroundColor: (theme: any) => theme.palette.action.hover
            }}
          >
            <Box
              sx={{
                py: 3,
                px: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: (theme: any) => `1px solid ${theme.palette.divider}`
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {!mdAbove && (
                  <IconButton onClick={handleLeftSidebarToggle} sx={{ mr: 2 }}>
                    <MenuIcon />
                  </IconButton>
                )}
                {/* {mdAbove ? null : (
                  <IconButton onClick={handleLeftSidebarToggle} sx={{ mr: 2 }}>
                    <MenuIcon />
                  </IconButton>
                )} */}
                <Box
                  onClick={handleUserProfileRightSidebarToggle}
                  sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                >
                  <Badge
                    overlap='circular'
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    sx={{ mr: 4.5 }}
                    badgeContent={
                      <Box
                        component='span'
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          boxShadow: (theme: any) => `0 0 0 2px ${theme.palette.background.paper}`
                          // color: `${statusObj[selectedChat.contact.status]}.main`,
                          // backgroundColor: `${statusObj[selectedChat.contact.status]}.main`
                        }}
                      />
                    }
                  >
                    {selectedChat?.profile_picture ||
                    selectedChat?.user?.profile_picture ||
                    otherUsersChat?.user?.profile_picture ? (
                      <MuiAvatar
                        src={
                          selectedChat?.participants?.length > 2
                            ? selectedChat?.name
                            : (otherUsersChat?.user?.profile_picture as string)
                        }
                        alt={
                          selectedChat?.participants?.length > 2
                            ? selectedChat?.name
                            : otherUsersChat?.user?.first_name + ' ' + otherUsersChat?.user?.last_name
                        }
                        sx={{ width: 40, height: 40 }}
                      />
                    ) : (
                      <CustomAvatar
                        skin='light'
                        // color={selectedChat.contact.avatarColor}
                        sx={{ width: 40, height: 40, fontSize: '1rem' }}
                      >
                        {getInitials(
                          selectedChat?.participants?.length > 2
                            ? selectedChat?.name
                            : otherUsersChat?.user?.first_name + ' ' + otherUsersChat?.user?.last_name
                        )}
                      </CustomAvatar>
                    )}
                  </Badge>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {user && selectedChat && <ChatName chat={selectedChat} user={user} activeCondition={false} />}
                    {/* <Typography sx={{ color: 'text.secondary' }}>
                      {
                        selectedChat?.name
                      }
                    </Typography> */}
                    {selectedChat?.participants?.length > 2 ? null : (
                      <Typography sx={{ color: 'white', my: 0, ml: 4, mr: 1.5, fontSize: 10, textAlign: 'center' }}>
                        {otherUsersChat?.user?.role?.code}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* {mdAbove ? (
                  <Fragment> */}
                {/* <IconButton size='small' sx={{ color: 'text.secondary' }}>
                      <PhoneOutline />
                    </IconButton>
                    <IconButton size='small' sx={{ color: 'text.secondary' }}>
                      <VideoOutline sx={{ fontSize: '1.5rem' }} />
                    </IconButton> 
                    <IconButton size='small' sx={{ color: 'text.secondary' }}>
                      <Magnify />
                    </IconButton>*/}
                {/* </Fragment>
                ) : null} */}
                {/* <IconButton size='small' onClick={handleClick} sx={{ color: 'text.secondary' }}>
                  <DotsVertical />
                </IconButton>
                <Menu
                  open={open}
                  sx={{ mt: 2 }}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                > */}
                {/* <MenuItem onClick={handleClose}>View Contact</MenuItem>
                  <MenuItem onClick={handleClose}>Mute Notifications</MenuItem>
                  <MenuItem onClick={handleClose}>Block Contact</MenuItem>
                  <MenuItem onClick={handleClose}>Clear Chat</MenuItem>
                  <MenuItem onClick={handleClose}>Report</MenuItem> */}
                {/* <MenuItem onClick={() => deleteSelectedChat(selectedChat.id as string)}>Delete</MenuItem>
                </Menu> */}
              </Box>
            </Box>
            {/* {selectedChat && store.userProfile ? (
            ): null} */}
            <ChatLog hidden={hidden} data={{ ...selectedChat, userContact: store?.selectedChat }} />
            <SendMsgForm store={store} dispatch={dispatch} sendMsg={sendMsg} data={{ ...selectedChat }} />
            <UserProfileRight
              store={store}
              hidden={hidden}
              statusObj={statusObj}
              getInitials={getInitials}
              sidebarWidth={sidebarWidth}
              userProfileRightOpen={userProfileRightOpen}
              handleUserProfileRightSidebarToggle={handleUserProfileRightSidebarToggle}
            />
          </Box>
        )
      }
    } else {
      return null
    }
  }

  return renderContent()
}

export default ChatContent
