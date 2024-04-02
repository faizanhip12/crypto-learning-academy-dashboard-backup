// ** MUI Imports
import { Box, Tab, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

// ** Types
import { VideoLayoutProps } from './types'
import Link from 'next/link'
import { FlexColumnMobile } from '../constants/styles'
import VideoComp from '../components/apps/videos/components'
import { useVideo } from '../hooks/apps/useVideo'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { fetchAllVideosOfCurrentChannel, emptyVideosOfCurrentChannel } from 'src/store/apps/video'
import { useAuth } from 'src/hooks/useAuth'
import { useAbility } from '@casl/react'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useTheme } from '@mui/material/styles'

const VideoLayout = ({ children }: VideoLayoutProps) => {
  // Hooks

  const [value, setValue] = useState('1')

  const {
    query: { id, slug },
    pathname
  } = useRouter()

  const { user } = useAuth()

  const { store } = useVideo(null)

  const routeSegments = pathname?.split('/')

  const lastSegment = routeSegments.pop()

  const {
    palette: {
      customColors: { themeColor, lightgrey, modal, tooltipBg, white }
    }
  } = useTheme()

  const colors = ['red', 'green', 'orange', 'yellow', lightgrey, modal, themeColor, tooltipBg, white]

  const ability = useAbility(AbilityContext)

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const target = document.getElementById('animated-text')
    let currentColorIndex = 0
    if (target) {
      const intervalId = setInterval(() => {
        if (currentColorIndex < colors.length - 1) {
          currentColorIndex += 1
        } else {
          currentColorIndex = 0
        }
        if (target) {
          target.style.color = colors[currentColorIndex]
        }
      }, 1000)
      dispatch(fetchAllVideosOfCurrentChannel(id as string))
      return () => {
        dispatch(emptyVideosOfCurrentChannel())
        clearInterval(intervalId)
      }
    }
  }, [id])

  const videoIndex = store?.allVideosOfCurrentChannel?.findIndex(item => item?.id === slug)

  return (
    <>
      <VideoComp videoIndex={videoIndex} />
      <Box sx={{ typography: 'body1', mt: 5 }}>
        {user?.role?.code === 'STUDENT' && (
          <Box textAlign={'center'}>
            <Typography component={'span'} variant='caption' id='animated-text'>
              Note: In order to watch the next video of the playlist you will have to pass the assignment of each video
              to unlock the next one. Happy Learning ❤
            </Typography>
          </Box>
        )}
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <FlexColumnMobile>
              <Link href={`/course/${id}/video/${slug}/comment`}>
                <Tab
                  label='Comment'
                  value={'1'}
                  sx={
                    lastSegment === 'comment'
                      ? {
                          borderBottom: `2px solid ${themeColor}`,
                          color: themeColor
                        }
                      : { color: '#fff' }
                  }
                />
              </Link>
              <Link href={`/course/${id}/video/${slug}/review`}>
                <Tab
                  label='Reviews'
                  value={'2'}
                  sx={
                    lastSegment === 'review'
                      ? {
                          borderBottom: `2px solid ${themeColor}`,
                          color: themeColor
                        }
                      : { color: '#fff' }
                  }
                />
              </Link>
              <Link href={`/course/${id}/video/${slug}`}>
                <Tab
                  label='Videos'
                  value={'3'}
                  sx={
                    lastSegment === '[slug]'
                      ? {
                          borderBottom: `2px solid ${themeColor}`,
                          color: themeColor
                        }
                      : { color: '#fff' }
                  }
                />
              </Link>
              {user?.role?.code === 'SUPER_ADMIN' || user?.role?.code === 'TEACHER' ? (
                ''
              ) : (
                <Link href={`/course/${id}/video/${slug}/assignment`}>
                  <Tab
                    label='Assignment'
                    value={'4'}
                    sx={
                      lastSegment === 'assignment'
                        ? {
                            borderBottom: `2px solid ${themeColor}`,
                            color: themeColor
                          }
                        : { color: '#fff' }
                    }
                  />
                </Link>
              )}
              <Link href={`/course/${id}/event`}>
                <Tab
                  label='Event'
                  value={'5'}
                  sx={
                    lastSegment === 'event'
                      ? {
                          borderBottom: `2px solid ${themeColor}`,
                          color: themeColor
                        }
                      : { color: '#fff' }
                  }
                />
              </Link>
              {ability.can('itsHaveAccess', 'workspace-module') && (
                <Link href={`/course/${id}/workspace`}>
                  <Tab
                    label='Workspace'
                    value={'6'}
                    sx={
                      lastSegment === 'workspace'
                        ? {
                            borderBottom: `2px solid ${themeColor}`,
                            color: themeColor
                          }
                        : { color: '#fff' }
                    }
                  />
                </Link>
              )}
              {ability.can('itsHaveAccess', 'student-module') && (
                <Link href={`/course/${id}/student`}>
                  <Tab
                    label='Student'
                    value={'6'}
                    sx={
                      lastSegment === 'student'
                        ? {
                            borderBottom: `2px solid ${themeColor}`,
                            color: themeColor
                          }
                        : { color: '#fff' }
                    }
                  />
                </Link>
              )}
              {ability.can('itsHaveAccess', 'certification-module') && (
                <Link href={`/course/${id}/certification`}>
                  <Tab
                    label='certification'
                    value={'6'}
                    sx={
                      lastSegment === 'certification'
                        ? {
                            borderBottom: `2px solid ${themeColor}`,
                            color: themeColor
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
          <TabPanel value='6'>{children}</TabPanel>
          <TabPanel value='7'>{children}</TabPanel>
        </TabContext>
      </Box>
    </>
  )
}

export default VideoLayout
