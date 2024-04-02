import React, { useEffect } from 'react'
import { Box, BoxProps, Card, Icon, Typography, styled } from '@mui/material'
import { Grid } from '@mui/material'
import Link from 'next/link'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import LoadingButton from '@mui/lab/LoadingButton'
import ProgressBox from 'src/@core/components/apps/current-course/components/ProgressBox'
import { useAuth } from 'src/hooks/useAuth'
import { useCourses } from 'src/@core/hooks/apps/useCourses'
import { ICourses } from 'src/types/apps/courses'
import { useRouter } from 'next/router'
import { textOverflow } from 'src/@core/helper/text'
import { useTheme } from '@mui/material/styles'
import { renderClient } from 'src/@core/components/common/renderClient'

const ProfileBox = styled('div')<BoxProps>(({ theme }) => ({
  textAlign: 'center',
  color: '#000',
  marginBottom: '50px',

  [`${theme.breakpoints.down('md')}`]: {}
}))

const ProfileImage = styled('div')<BoxProps>(({ theme }) => ({
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'center',
  [`${theme.breakpoints.down('md')}`]: {}
}))

const CoursesFlex = styled('div')<BoxProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '50px',
  [`${theme.breakpoints.down('md')}`]: {}
}))
const CoursesLink = styled('div')<BoxProps>(({ theme }) => ({
  borderRadius: '12px',
  background: ' #131313',
  padding: '18px',
  width: '100%',
  maxWidth: '48%',
  textAlign: 'left',
  [`${theme.breakpoints.down('md')}`]: {}
}))

const HeadingBox = styled('div')<BoxProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '40px',
  [`${theme.breakpoints.down('md')}`]: {}
}))

const Page = () => {
  // Hooks

  const { getAllMyCourses, store } = useCourses(null)

  const theme = useTheme()

  useEffect(() => {
    getAllMyCourses({ query: '4' })
  }, [])

  const { user } = useAuth()

  const { push } = useRouter()

  return (
    <>
      <Box>
        <Grid container spacing={10}>
          <Grid item md={4}>
            <Card sx={{ padding: 10, paddingBottom: 40 }}>
              <ProfileBox>
                <ProfileImage>
                  {renderClient(user?.profile_picture, user?.first_name + ' ' + user?.last_name || 'UnKnown', 100, 100)}
                </ProfileImage>
                <Typography variant='h5' color='white' fontWeight='bold'>
                  {user?.first_name + ' ' + user?.last_name}
                </Typography>
                <Typography variant='body1' color='white'>
                  {/* Member Since 2022{' '} */}
                </Typography>
              </ProfileBox>
              <CoursesFlex>
                <CoursesLink onClick={() => push('/my-courses/all')} sx={{ cursor: 'pointer' }}>
                  <Typography variant='h6' color={theme.palette.customColors.grey} marginBottom='10px'>
                    Course
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='h6' fontWeight='bold' fontSize='16px' color='white'>
                      {store.entities?.[0]?.courseCount < 10
                        ? '0' + store.entities[0]?.courseCount
                        : store.entities[0]?.courseCount || 0}
                    </Typography>
                    <Link href='/my-courses/all'>
                      <Icon
                        style={{
                          background: '#fff',
                          height: '25px',
                          width: '25px',
                          borderRadius: '50%',
                          color: '#000',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          pointerEvents: 'none'
                        }}
                      >
                        <ArrowForwardIosIcon style={{ fontSize: '15px', fontWeight: 'bold' }} />
                      </Icon>
                    </Link>
                  </Box>
                </CoursesLink>
                <CoursesLink onClick={() => push('/my-courses/all')} sx={{ cursor: 'pointer' }}>
                  <Typography variant='h6' color={theme.palette.customColors.grey} marginBottom='10px'>
                    Certificate
                  </Typography>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    onClick={() => push('/my-courses/all')}
                  >
                    <Typography variant='h6' fontWeight='bold' fontSize='16px' color='white'>
                      {store.entities?.[0]?.certificateCount < 10
                        ? '0' + store.entities[0]?.certificateCount
                        : store.entities[0]?.certificateCount || 0}
                    </Typography>
                    <Link style={{ display: 'block' }} href=''>
                      <Icon
                        style={{
                          background: '#fff',
                          height: '25px',
                          width: '25px',
                          borderRadius: '50%',
                          color: '#000',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <ArrowForwardIosIcon style={{ fontSize: '15px', fontWeight: 'bold' }} />
                      </Icon>
                    </Link>
                  </Box>
                </CoursesLink>
              </CoursesFlex>

              <Box>
                <Typography variant='h5' color='white' marginBottom='20px'>
                  Bio
                </Typography>
                <Typography variant='body1' color='white'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </Typography>
                <Typography variant='body1' color='white'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item md={8}>
            <HeadingBox>
              <Typography variant='h3' color='white'>
                Current Course
              </Typography>
              <LoadingButton variant='contained' onClick={() => push('/my-courses/all')} color='primary'>
                View All
              </LoadingButton>
            </HeadingBox>
            <Grid container spacing={8}>
              {store?.entities?.map((item: ICourses) => {
                return (
                  <Grid item md={6} key={item?.id}>
                    <ProgressBox
                      key={item?.id}
                      channelId={item?.channelId}
                      class={textOverflow(item?.name as string, 18) || 'UI Design Beginner'}
                      totalcourses={`${item?.totalVideosCompletedCount || 0}/${
                        item?.courseCompletePercentage?.toFixed(2) || 100
                      }`}
                      courseCompletePercentage={item?.courseCompletePercentage}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'my-courses-page'
}

export default Page
