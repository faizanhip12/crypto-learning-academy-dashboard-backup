import React from 'react'
import { Box, Chip, ListItemText, Typography } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { Chat } from 'src/types/apps/chatTypes'
import { UserDataType } from 'src/context/types'
import { AccountGroup } from 'mdi-material-ui'

interface Props {
  chat: Chat | any
  user: UserDataType
  activeCondition: Boolean
  teacherName?: any
  test?: any
}

const ChatName: React.FC<Props> = ({ chat, user, activeCondition, teacherName, test = 'NOT FOUND' }) => {
  // console.log(teacherName)
  let name: string = 'TEMP'
  if (chat.name === 'ONE_TO_ONE') {
    const participant = chat?.participants.find((participant: any) => participant.userId !== user.id)
    name = `${participant?.user?.first_name} ${participant?.user?.last_name}`
  } else if (test && user?.role?.code === 'TEACHER') {
    name = test
  } else {
    name = teacherName[0]?.user ? teacherName[0]?.user?.first_name + ' ' + teacherName[0]?.user?.last_name : 'Not Found'
  }

  return (
    <>
      <ListItemText
        sx={{
          my: 0,
          ml: 4,
          mr: 1.5,
          '& .MuiTypography-root': { ...(activeCondition ? { color: 'common.white' } : {}) }
        }}
        primary={
          <Typography noWrap sx={{ ...(!activeCondition ? { color: 'text.secondary' } : {}) }}>
            {name} {chat?.participants?.length > 2 && <AccountGroup />}
          </Typography>
        }
        secondary={
          <Typography
            noWrap
            variant='body2'
            sx={{
              color: !activeCondition
                ? ({
                    palette: {
                      text: { disabled }
                    }
                  }: Theme) => disabled
                : {}
            }}
          >
            {chat?.messages?.length > 0 ? chat?.messages[0]?.message : null}
          </Typography>
        }
      />
      {/* <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          flexDirection: 'column',
          justifyContent: 'flex-start'
        }}
      >
        <Typography sx={{ whiteSpace: 'nowrap', color: activeCondition ? 'common.white' : 'text.disabled' }}>
          <>{true ? formatDateToMonthShort("new Date()" as string, true) : new Date()}</>
        </Typography>
        {true ? (
          <Chip
            color='error'
            // chat.chat.unseenMsgs
            label={"0"}
            sx={{
              mt: 0.5,
              height: 18,
              fontWeight: 600,
              fontSize: '0.75rem',
              '& .MuiChip-label': { pt: 0.25, px: 1.655 }
            }}
          />
        ) : null}
      </Box> */}
    </>
  )
}

export default ChatName
