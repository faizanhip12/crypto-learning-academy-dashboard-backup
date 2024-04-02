import { Box, Grid, Skeleton, Tab, Tooltip, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { useChannels } from '../hooks/apps/useChannels'
import LoadingButton from '@mui/lab/LoadingButton'
import CheckIcon from '@mui/icons-material/Check'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import { ChannelLayoutProps } from './types'
import Link from 'next/link'
import { IChannels } from 'src/types/apps/channels'
import { textOverflow } from '../helper/text'
import { CenterImg, AlignRight, CenterWrapperText, FlexColumnMobile } from '../constants/styles'
import { useTheme } from '@mui/material/styles'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { numFormatter } from '../components/numFormatter'

export const renderClient = (row: IChannels) => {
  if (row?.thumnail_url) {
    return (
      <CenterImg>
        <CustomAvatar src={row?.thumnail_url} sx={{ width: '100%', height: '100%' }} />
      </CenterImg>
    )
  } else {
    return (
      <CenterImg>
        <CustomAvatar skin='light' color={row.avatarColor || 'primary'}>
          {getInitials(row?.name as string)}
        </CustomAvatar>
      </CenterImg>
    )
  }
}

const ChannelLayout = ({ children }: ChannelLayoutProps) => {
  // Hooks
  const { store, getChannelById, subscribeChannelsById, deleteChannels, getMyChannels, status } = useChannels(null)
  const theme = useTheme()
  const [value, setValue] = useState('1')
  const router = useRouter()
  const ability = useContext(AbilityContext)
  const routeSegments = router.pathname?.split('/')
  const lastSegment = routeSegments.pop()
  let {
    query: { id }
  } = router

  useEffect(() => {
    getChannelById(id)
  }, [id])

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const channelSubscription = async (id: string) => {
    const { statusCode } = await subscribeChannelsById(id, 'ONE')
    if (statusCode === '10000' && router.pathname === '/channels/[id]/channels') {
      getMyChannels(store?.entity?.userId)
    }
  }
  return (
    <>
      {store.status === 'pending' ? (
        <Box width={'100%'} lineHeight={1.5}>
          <Skeleton variant='rectangular' height={'15vh'} />
        </Box>
      ) : (
        <Grid spacing={5} container ml={0} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
          <Grid lg={1} md={2} xs={12} sm={2}>
            {renderClient(store?.entity)}
          </Grid>
          <Grid lg={8} md={5} xs={12} sm={5}>
            <CenterWrapperText>
              <Typography variant='h4'>{textOverflow(store?.entity?.name, 25)}</Typography>
              <Typography variant='caption' fontSize={20}>
                @{textOverflow(store?.entity?.slug, 30)}
              </Typography>
              <Typography variant='h6' mb={3}>
                {numFormatter(store?.entity?.subscriber?.length)} Followers
              </Typography>
            </CenterWrapperText>
          </Grid>
          <Grid xs={12} lg={2} md={2} sm={3}>
            <AlignRight>
              <Tooltip
                title={`Click to ${store.entity?.isSubscribed ? 'unsubscribe' : 'subscribe'} to ${textOverflow(
                  store.entity?.name,
                  20
                )}`}
              >
                <LoadingButton
                  loading={status === 'pending'}
                  disabled={status === 'pending'}
                  loadingPosition='end'
                  color={store?.entity?.isSubscribed ? 'success' : 'primary'}
                  variant='contained'
                  type='submit'
                  onClick={() => channelSubscription(store?.entity?.id)}
                  endIcon={store?.entity?.isSubscribed ? <CheckIcon color='success' /> : null}
                >
                  {store?.entity?.isSubscribed ? 'Subscribed' : 'Subscribe'}
                </LoadingButton>
              </Tooltip>
            </AlignRight>
          </Grid>
        </Grid>
      )}
      <Box sx={{ typography: 'body1', mt: 5 }}>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <FlexColumnMobile>
              <Link href={`/channels/${store?.entity.id}`}>
                <Tab
                  label='Home'
                  value={'1'}
                  sx={
                    lastSegment === '[id]'
                      ? {
                          borderBottom: `2px solid ${theme.palette.customColors.themeColor}`,
                          color: theme.palette.customColors.themeColor
                        }
                      : { color: '#fff' }
                  }
                />
              </Link>
              <Link href={`/channels/${store?.entity.id}/about`}>
                <Tab
                  label='About'
                  value={'2'}
                  sx={
                    lastSegment === 'about'
                      ? {
                          borderBottom: `2px solid ${theme.palette.customColors.themeColor}`,
                          color: theme.palette.customColors.themeColor
                        }
                      : { color: '#fff' }
                  }
                />
              </Link>
              <Link href={`/channels/${store?.entity.id}/courses`}>
                <Tab
                  label='Courses'
                  value={'3'}
                  sx={
                    lastSegment === 'courses'
                      ? {
                          borderBottom: `2px solid ${theme.palette.customColors.themeColor}`,
                          color: theme.palette.customColors.themeColor
                        }
                      : { color: '#fff' }
                  }
                />
              </Link>
              <Link href={`/channels/${store?.entity.id}/channels`}>
                <Tab
                  label='Channels'
                  value={'4'}
                  sx={
                    lastSegment === 'channels'
                      ? {
                          borderBottom: `2px solid ${theme.palette.customColors.themeColor}`,
                          color: theme.palette.customColors.themeColor
                        }
                      : { color: '#fff' }
                  }
                />
              </Link>
              {ability.can('itsHaveAccess', 'channels-chat-page') && (
                <Link href={`/channels/${store?.entity.id}/chat`}>
                  <Tab
                    label='Chat'
                    value={'5'}
                    sx={
                      lastSegment === 'chat'
                        ? {
                            borderBottom: `2px solid ${theme.palette.customColors.themeColor}`,
                            color: theme.palette.customColors.themeColor
                          }
                        : { color: '#fff' }
                    }
                  />
                </Link>
              )}
            </FlexColumnMobile>
          </TabList>
          <TabPanel value='1'>{children}</TabPanel>
          <TabPanel value='2'>{children}</TabPanel>
          <TabPanel value='3'>{children}</TabPanel>
          <TabPanel value='4'>{children}</TabPanel>
          <TabPanel value='5'>{children}</TabPanel>
        </TabContext>
      </Box>
    </>
  )
}

export default ChannelLayout
