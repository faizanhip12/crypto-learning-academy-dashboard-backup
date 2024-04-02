import { Box, Skeleton, Typography } from '@mui/material'
import React from 'react'
import useAsync from 'src/@core/hooks/useAsync'
import { ChannelService } from 'src/services'
import { IChannels } from 'src/types/apps/channels'
import { useAuth } from 'src/hooks/useAuth'
import { textOverflow } from 'src/@core/helper/text'
import { useTheme } from '@mui/material/styles'
import { renderClient } from 'src/@core/components/common/renderClient'

const MyChannelList = () => {
  const auth = useAuth()

  const {
    palette: {
      customColors: { grey, themeColor }
    }
  } = useTheme()

  const { status, data } = useAsync(ChannelService.getByUser)

  const switchChannel = (id: string) => {
    auth.handleSwitchChannel(id)
  }

  const currentActiveChannel = auth?.user?.activeChannel?.channel?.id

  return (
    <>
      {auth?.user?.role?.code === 'SUPER_ADMIN' || auth?.user?.role?.code === 'STUDENT' ? null : (
        <Typography
          noWrap
          component='a'
          variant='subtitle2'
          sx={{
            color: 'text.primary',
            textDecoration: 'none',
            margin: 'auto',
            marginTop: 2,
            marginBottom: 0,
            minHeight: 20
          }}
        >
          Switch Channel
        </Typography>
      )}
      {data?.data?.entities?.length > 1 && <Box sx={{ border: '2px solid ', width: '100%', mt: 3 }}></Box>}
      {status === 'pending'
        ? auth?.user?.role?.code === 'STUDENT' ||
          auth?.user?.role?.code === 'SUPER_ADMIN' || (
            <Skeleton variant='rounded' width={'100%'} height={'5vh'} sx={{ bgcolor: grey }} />
          )
        : data?.data?.entities?.map((item: IChannels) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                cursor: 'pointer',
                margin: 2,
                padding: 2,
                width: '95%',
                borderRadius: 4
              }}
              onClick={() => switchChannel(item?.id)}
              key={item.id}
            >
              {renderClient(item?.thumnail_url, item?.name)}
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{
                  color: 'text.primary',
                  textDecoration: 'none',
                  fontWeight:
                    data?.data?.entities?.length > 1 ? (currentActiveChannel === item?.id ? 'bold' : 'normal') : null,
                  borderBottom:
                    data?.data?.entities?.length > 1
                      ? currentActiveChannel === item?.id
                        ? `2px solid ${themeColor}`
                        : 'none'
                      : 'none'
                }}
              >
                {textOverflow(item?.name as string, 15)}
              </Typography>
            </Box>
          ))}
    </>
  )
}

export default MyChannelList
