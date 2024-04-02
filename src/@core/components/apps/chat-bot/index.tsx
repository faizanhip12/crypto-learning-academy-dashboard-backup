import React, { useEffect, useRef, useState } from 'react'
import { styled } from '@mui/material/styles'
import SendIcon from '@mui/icons-material/Send'
import { IconButton, Typography, TextField, Box, Avatar, BoxProps, useTheme } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { getAllMessagesList, sendPrompt } from 'src/store/apps/chat-bot'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { useSelector } from 'react-redux'
import Conversation from './Conversation'
import { useAuth } from 'src/hooks/useAuth'

const CardBoxSingle = styled(Box)<BoxProps>(
  ({
    theme: {
      breakpoints: { down }
    }
  }) => ({
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    width: '100%',
    padding: '0 3px ',
    color: '#FFF',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [down('sm')]: {}
  })
)

const ChatBot = () => {
  // Hooks
  const {
    palette: {
      customColors: { buttonGradient, white, themeColor }
    }
  } = useTheme()
  const [msg, setMsg] = useState<string>('')
  const [isChatting, setIsChatting] = useState(false)
  const [error, setError] = useState(false)
  const { entity } = useSelector((state: RootState) => state.chat_bot)
  const dispatch = useDispatch<AppDispatch>()

  const handleChatToggle = () => {
    setIsChatting(pre => !pre)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setMsg(e.target.value)
  }

  const { user } = useAuth()

  const lastMessageRef: any = useRef(null)

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [lastMessageRef.current])

  const onSend = async () => {
    if (!msg) {
      setError(true)
    } else {
      dispatch(sendPrompt({ prompt: msg, userId: user?.id as string }))
      setMsg('')
    }
  }

  useEffect(() => {
    dispatch(getAllMessagesList(''))
  }, [])

  // return isChatting ? (
  return (
    <Box
      sx={{
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
        height: '80%',
        width: '75%',
        background: '#fff',
        position: 'fixed',
        bottom: '100px',
        right: '70px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CardBoxSingle sx={{ background: buttonGradient }}>
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              alt='smart-chain'
              src={'/images/smart-chain-logo.png'}
              sx={{ width: '1.5rem', height: '1.5rem', objectFit: 'contain' }}
            />
            <Box>
              <Typography variant='body2' sx={{ fontSize: '0.9rem', color: white }} ml={2}>
              Crypto Learning Academy
              </Typography>
              <Typography variant='body2' sx={{ fontSize: '10px', color: white }} ml={2}>
                Support Team
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardBoxSingle>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', maxHeight: 'calc(100% - 50px)' }}>
        <Conversation lastMessageRef={lastMessageRef} />
        <Box sx={{ display: 'flex' }}>
          <Box height='100%' display='flex' width='100%' sx={{ borderTop: `1px solid ${themeColor}`, padding: '2px' }}>
            <Box width='85%'>
              <TextField
                fullWidth
                value={msg}
                size='small'
                error={error}
                helperText={error ? 'Invalid Message' : ''}
                required
                inputProps={{
                  style: {
                    backgroundColor: '#fff',
                    color: '#000',
                    fontSize: '14px'
                  }
                }}
                placeholder='Type your message here…'
                onChange={handleChange}
              />
            </Box>
            <Box display='flex' alignItems='center' justifyContent='center' width='15%'>
              <IconButton onClick={onSend} disabled={!!entity}>
                <SendIcon sx={{ color: entity ? 'gray' : themeColor }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* <Box display='flex' justifyContent='flex-end' alignItems='center' onClick={handleChatToggle}>
        <Box
          sx={{
            background: themeColor,
            width: '60px',
            padding: '10px',
            borderRadius: '50%',
            marginTop: '15px',
            position: 'fixed',
            bottom: '30px',
            right: '70px'
          }}
        >
          <IconButton>
            <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
          </IconButton>
        </Box>
      </Box> */}
    </Box>
    // ) : (
    //   <Box
    //     display='flex'
    //     justifyContent='center'
    //     alignItems='center'
    //     sx={{
    //       background: theme.palette.customColors.themeColor,
    //       width: '60px',
    //       padding: '10px',
    //       borderRadius: '50%',
    //       position: 'fixed',
    //       bottom: '30px',
    //       right: '70px'
    //     }}
    //     onClick={handleChatToggle}
    //   >
    //     <IconButton>
    //       <ChatIcon sx={{ color: '#fff' }} />
    //     </IconButton>
    //   </Box>
  )
}

export default ChatBot
{
  /* {error ? <FormHelperText error sx={{marginLeft:"15px" , marginTop:"0px"}}>Invalid Prompt</FormHelperText> : null} */
}
