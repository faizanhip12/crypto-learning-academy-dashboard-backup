import React from 'react'
import { Typography, Box, useTheme } from '@mui/material'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { formatDistanceToNow } from 'date-fns'

interface IMessageBody {
  isSender: boolean
  message: string
  createdAt: Date | undefined | any
  blink?: boolean
  messageRef?: any
}

const MessageBody = ({ message, isSender, blink, createdAt, messageRef }: IMessageBody) => {
  // Hooks
  const {
    palette: {
      customColors: { themeColor }
    }
  } = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: !isSender ? 'row' : 'row-reverse'
      }}
      ref={messageRef}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: !isSender ? 'row' : 'row-reverse',
          alignItems: 'flex-end',
          flex: '0 0 100%',
          maxWidth: '100%',
          margin: '5px 0'
        }}
      >
        <CustomAvatar
          src={!isSender ? '/images/smart-chain-logo.png' : undefined}
          imgProps={{
            style: {
              padding: '3px'
            }
          }}
          sx={{
            width: '1.6rem',
            height: '1.6rem',
            fontSize: '0.875rem',
            ml: isSender ? 2 : undefined,
            mr: !isSender ? 2 : undefined,
            background: themeColor
          }}
        >
          {isSender ? <Typography fontSize='10px'>You</Typography> : null}
        </CustomAvatar>
        <Box sx={{ '&:not(:last-of-type)': { mb: 3.5 }, flexBasis: 'max-content', maxWidth: '80%' }}>
          <Box sx={{ flex: '0 0 100%', maxWidth: '100%' }}>
            <Typography
              sx={{
                boxShadow: 1,
                borderRadius: 1,
                fontSize: '0.875rem',
                wordWrap: 'break-word',
                p: ({ spacing }) => spacing(3, 4),
                ml: isSender ? 'auto' : undefined,
                borderTopLeftRadius: !isSender ? 0 : undefined,
                borderTopRightRadius: isSender ? 0 : undefined,
                color: isSender ? 'common.white' : 'common.white',
                backgroundColor: isSender ? themeColor : themeColor
              }}
              id={blink ? 'generating-box' : ''}
            >
              {message} {blink ? <span className='blinking-cursor'>|</span> : null}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: isSender ? 'flex-end' : 'flex-start'
            }}
          >
            <Typography variant='caption' sx={{ color: 'primary.main' }}>
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default MessageBody
