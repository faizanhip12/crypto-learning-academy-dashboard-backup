import { Grid, Rating, Typography } from '@mui/material'
import { GraphBox } from 'src/@core/constants/styles'
import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { useTheme } from '@mui/material/styles'
import { useDashboard } from 'src/@core/hooks/apps/useDashboard'
import { ILatestReviews } from 'src/types/apps/dashboard'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/router'

const PopularCoursesCard = () => {
  // Hooks

  const {
    palette: {
      customColors: { themeColor, white }
    }
  } = useTheme()
  const { store } = useDashboard()
  const { push } = useRouter()

  return (
    <>
      <GraphBox>
        <Typography variant='h6'>Latest Reviews</Typography>
        {store.status === 'success' && !store.teacherEntity?.popularCourses?.length ? (
          <Grid container spacing={5} mt={0} justifyContent={'center'}>
            <Typography mt={5}>No Records Exists</Typography>
          </Grid>
        ) : (
          store.teacherEntity?.latestReviews?.map((latestReviews: ILatestReviews, index: number) => {
            return (
              <Grid container spacing={5} mt={0} justifyContent={'space-between'} key={index}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Typography variant='h6' color={themeColor}>
                    {latestReviews?.courseName || 'Technical law'}
                  </Typography>
                  <Rating
                    name='half-rating-read'
                    defaultValue={latestReviews?.starCount}
                    precision={0.5}
                    readOnly
                    size='small'
                  />
                  <Typography variant='body2' color={white}>
                    {latestReviews?.createdAt
                      ? formatDistanceToNow(new Date(latestReviews?.createdAt || '17 Sep 2023'), { addSuffix: true })
                      : '17 Sep 2023'}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12} ml={'auto'} textAlign={'right'}>
                  <LoadingButton
                    loadingPosition='end'
                    size='large'
                    variant='contained'
                    color='primary'
                    onClick={() => push(`/channels/${latestReviews?.channelId}/courses/`)}
                  >
                    View Course
                  </LoadingButton>
                </Grid>
              </Grid>
            )
          })
        )}
      </GraphBox>
    </>
  )
}

export default PopularCoursesCard
