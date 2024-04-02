// ** React Imports
import { useRef, useEffect, Ref, ReactNode, useState, useContext } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import Check from 'mdi-material-ui/Check'
import CheckAll from 'mdi-material-ui/CheckAll'

// ** Third Party Components
import PerfectScrollbarComponent, { ScrollBarProps } from 'react-perfect-scrollbar'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Imports
import { getInitials } from 'src/@core/utils/get-initials'

// ** Types Imports
import {
  ChatLogType,
  MessageType,
  MsgFeedbackType,
  ChatLogChatType,
  MessageGroupType,
  FormattedChatsType
} from 'src/types/apps/chatTypes'
import { useDispatch } from 'react-redux'
import { appChatSlice, startConversation } from 'src/store/apps/chat'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { useAuth } from 'src/hooks/useAuth'
import { SocketContext } from 'src/context/SocketContext'
import { Button } from '@mui/material'
import { it } from 'date-fns/locale'
import { IUser } from 'src/types/apps/user'

const PerfectScrollbar = styled(PerfectScrollbarComponent)<ScrollBarProps & { ref: Ref<unknown> }>(
  ({ theme: { spacing } }) => ({
    padding: spacing(5)
  })
)

const ChatLog = (props: ChatLogType) => {
  // ** Props
  const { data, hidden } = props

  const dispatch = useDispatch()

  let conversationId = data?.id

  useEffect(() => {
    // dispatch(startConversation(conversationId))
  }, [])

  const store = useSelector((state: RootState) => state?.chat?.conversation)

  // ** Ref
  const chatArea: any = useRef(null)

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    if (chatArea.current) {
      if (hidden) {
        chatArea.current.scrollTop = Number.MAX_SAFE_INTEGER
      } else {
        chatArea.current._container.scrollTop = Number.MAX_SAFE_INTEGER
      }
    }
  }

  // ** Formats chat data based on sender
  const formattedChatData = () => {
    let chatLog: MessageType[] | [] = []
    if (data.chat) {
      chatLog = data.chat.chat
    }

    const formattedChatLog: FormattedChatsType[] = []
    let chatMessageSenderId = chatLog[0] ? chatLog[0].senderId : 11
    let msgGroup: MessageGroupType | any = {
      senderId: chatMessageSenderId,
      messages: []
    }
    chatLog.forEach((msg: MessageType, index: number) => {
      if (chatMessageSenderId === msg.senderId) {
        msgGroup.messages.push({
          time: msg.time,
          msg: msg.message,
          feedback: msg.feedback
        })
      } else {
        chatMessageSenderId = msg.senderId
        formattedChatLog.push(msgGroup)
        msgGroup = {
          senderId: msg.senderId,
          messages: [
            {
              time: msg.time,
              msg: msg.message,
              feedback: msg.feedback
            }
          ]
        }
      }
      if (index === chatLog.length - 1) formattedChatLog.push(msgGroup)
    })

    return formattedChatLog
  }

  // const renderMsgFeedback = (isSender: boolean, feedback: MsgFeedbackType) => {
  //   if (isSender) {
  //     if (feedback?.isSent && !feedback?.isDelivered) {
  //       return <Check sx={{ mr: 2, fontSize: '1rem', color: 'text.secondary' }} />
  //     } else if (feedback?.isSent && feedback?.isDelivered) {
  //       return (
  //         <CheckAll sx={{ mr: 2, fontSize: '1rem', color: feedback?.isSeen ? 'success.main' : 'text.secondary' }} />
  //       )
  //     } else {
  //       return null
  //     }
  //   }
  // }

  const { user }: IUser = useAuth()

  const { socket } = useContext(SocketContext)

  useEffect(() => {
    if (data && 'participants' in data && data?.participants) {
      scrollToBottom()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    // console.log("JOIN_CHAT_ROOM", JSON.stringify({
    //   id: conversationId,
    //   userId: user?.id
    // }))
    // socket.emit(
    //   'JOIN_CHAT_ROOM',
    //   JSON.stringify({
    //     id: conversationId,
    //     userId: user?.id
    //   })
    // )

    socket.on('LISTEN_ROOM_MESSAGE', (data: any) => {
      dispatch(appChatSlice.actions.eventMsgListener(data))
    })

    return () => {
      socket.off('LISTEN_ROOM_MESSAGE')
    }
  }, [])

  // ** Renders user chat
  const renderChats = () => {
    return store?.map((item: FormattedChatsType, index: number) => {
      // const isSender = item?.senderId === data?.userContact?.id;
      const isSender = item?.senderId === user.id
      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: !isSender ? 'row' : 'row-reverse',
            mb: index !== formattedChatData().length - 1 ? 9.75 : undefined
          }}
        >
          <Box>
            <CustomAvatar
              skin='light'
              color={data?.profile_picture ? data?.profile_picture : (undefined as any)}
              sx={{
                width: '2rem',
                height: '2rem',
                fontSize: '0.875rem',
                ml: isSender ? 4 : undefined,
                mr: !isSender ? 4 : undefined
              }}
              {...(data?.profile_picture && !isSender ? { src: data?.profile_picture, alt: data?.name } : {})}
              {...(isSender ? { src: data?.profile_picture, alt: data?.name } : {})}
            >
              {data?.profile_picture ? getInitials(data?.name) : null}
            </CustomAvatar>
          </Box>

          <Box key={index} sx={{ '&:not(:last-of-type)': { mb: 3.5 } }}>
            <Box>
              <Typography
                sx={{
                  boxShadow: 1,
                  borderRadius: 1,
                  width: 'fit-content',
                  fontSize: '0.875rem',
                  p: ({ spacing }) => spacing(3, 4),
                  ml: isSender ? 'auto' : undefined,
                  borderTopLeftRadius: !isSender ? 0 : undefined,
                  borderTopRightRadius: isSender ? 0 : undefined,
                  color: isSender ? 'common.white' : 'text.primary',
                  backgroundColor: isSender ? 'primary.main' : 'background.paper'
                }}
              >
                {item?.message}
              </Typography>
            </Box>
            {index + 1 === length || true ? (
              <Box
                sx={{
                  mt: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isSender ? 'flex-end' : 'flex-start'
                }}
              >
                {/* {renderMsgFeedback(isSender, chat?.feedback)} */}
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                      })
                    : null}
                </Typography>
              </Box>
            ) : null}
          </Box>

          {/* <Box className='chat-body' sx={{ maxWidth: ['calc(100% - 5.75rem)', '75%', '65%'] }}>
            {store?.map((chat: ChatLogChatType, index: number, { length }: { length: number }) => {
              const time = new Date(chat?.createdAt)
              return (
                <Box key={index} sx={{ '&:not(:last-of-type)': { mb: 3.5 } }}>
                  <Box>
                    <Typography
                      sx={{
                        boxShadow: 1,
                        borderRadius: 1,
                        width: 'fit-content',
                        fontSize: '0.875rem',
                        p: (theme: any) => theme.spacing(3, 4),
                        ml: isSender ? 'auto' : undefined,
                        borderTopLeftRadius: !isSender ? 0 : undefined,
                        borderTopRightRadius: isSender ? 0 : undefined,
                        color: isSender ? 'common.white' : 'text.primary',
                        backgroundColor: isSender ? 'primary.main' : 'background.paper'
                      }}
                    >
                      {chat?.message}
                    </Typography>
                  </Box>
                  {index + 1 === length ? (
                    <Box
                      sx={{
                        mt: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isSender ? 'flex-end' : 'flex-start'
                      }}
                    >
                      {renderMsgFeedback(isSender, chat?.feedback)}
                      <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                        {time
                          ? new Date(time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                          : null}
                      </Typography>
                    </Box>
                  ) : null}
                </Box>
              )
            })}
          </Box> */}
        </Box>
      )
    })
  }

  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return (
        <Box ref={chatArea} sx={{ p: 5, height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
          {children}
        </Box>
      )
    } else {
      return (
        <PerfectScrollbar ref={chatArea} options={{ wheelPropagation: false }}>
          {children}
        </PerfectScrollbar>
      )
    }
  }

  return (
    <Box sx={{ height: 'calc(100% - 8.4375rem)' }}>
      <ScrollWrapper>{renderChats()}</ScrollWrapper>
    </Box>
  )
}

export default ChatLog
