import React from 'react'
import Box from '@mui/material/Box'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import MessageBody from './MessageBody'

const Conversation = ({ lastMessageRef }: any) => {
  const { entities, entity } = useSelector((state: RootState) => state.chat_bot)

  return (
    <Box sx={{ overflowY: 'scroll', padding: 2, flex: 1, maxHeight: 'calc(100% - 45px)' }}>
      {entities?.map(({ type, message, createdAt }, i) => {
        const isLastMessage = i === entities?.length - 1
        const messageRef = isLastMessage ? lastMessageRef : null
        return (
          <MessageBody
            key={i}
            isSender={type === 'sender'}
            message={message}
            createdAt={createdAt}
            messageRef={messageRef}
          />
        )
      })}
      {entity ? (
        <MessageBody
          isSender={false}
          message={entity.message}
          blink
          createdAt={entity.createdAt}
          messageRef={lastMessageRef}
        />
      ) : null}
    </Box>
  )
}

export default Conversation
