import React, { useMemo, useState } from 'react'
import { Badge, Box, ListItemText, Typography } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { Chat, ChatSidebarLeftType } from 'src/types/apps/chatTypes'
import { UserDataType } from 'src/context/types'
import { AccountGroup } from 'mdi-material-ui'

import MuiAvatar from '@mui/material/Avatar'
import CustomAvatar from 'src/@core/components/mui/avatar'
import ListItemAvatar from '@mui/material/ListItemAvatar'

interface Props {
  chat: Chat
  user: UserDataType
  activeCondition: Boolean
  statusObj: ChatSidebarLeftType['statusObj']
  getInitials: (val: string) => string
}

const ChatProfile: React.FC<Props> = ({
  chat,
  user,
  activeCondition,
  getInitials,
  statusObj
}) => {

  let name: string = 'TEMP';
  let profile_picture: string | null = null;

  if (chat.name === 'ONE_TO_ONE') {
    const participant = chat?.participants.find(participant => participant.userId !== user.id);
    name = `${participant?.user?.first_name} ${participant?.user?.last_name}`;
    profile_picture = participant?.user?.profile_picture || null;
  } else {
    name = chat.name;
    profile_picture = chat.profile_picture || null;
  }

  return (
    <ListItemAvatar sx={{ m: 0 }}>
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
              width: 8,
              height: 8,
              borderRadius: '50%',
              color: `${statusObj[chat.status]}.main`,
              backgroundColor: `${statusObj[chat.status]}.main`,
              boxShadow: (theme: Theme) =>
                `0 0 0 2px ${!activeCondition ? theme.palette.background.paper : theme.palette.common.white
                }`
            }}
          />
        }
      >
        {profile_picture ? (
          <MuiAvatar
            src={profile_picture}
            alt={name}
            sx={{
              width: 40,
              height: 40,
              border: (theme: Theme) => (activeCondition ? `2px solid ${theme.palette.common.white}` : '')
            }}
          />
        ) : (
          <CustomAvatar
            color={'primary'}
            skin={activeCondition ? 'light-static' : 'light'}
            sx={{
              width: 40,
              height: 40,
              fontSize: '1rem',
              border: (theme: Theme) => (activeCondition ? `2px solid ${theme.palette.common.white}` : '')
            }}
          >
            {getInitials(name)}
          </CustomAvatar>
        )}
      </Badge>
    </ListItemAvatar>
  )
}

export default ChatProfile;


{/* <ListItemAvatar sx={{ m: 0 }}>
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
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          color: `${statusObj[chat.status]}.main`,
                          backgroundColor: `${statusObj[chat.status]}.main`,
                          boxShadow: (theme: Theme) =>
                            `0 0 0 2px ${!activeCondition ? theme.palette.background.paper : theme.palette.common.white
                            }`
                        }}
                      />
                    }
                  >
                    <ChatProfile chat={chat} user={user} activeCondition={activeCondition} getInitials={getInitials} />
                  </Badge>
                </ListItemAvatar> */}