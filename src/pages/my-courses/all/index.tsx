import { Box, Grid, Skeleton, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import DataNotFound from 'src/@core/components/apps/channels/components/DataNotFound'
import ProgressBox from 'src/@core/components/apps/current-course/components/ProgressBox'
import { textOverflow } from 'src/@core/helper/text'
import { useCourses } from 'src/@core/hooks/apps/useCourses'
import { useAuth } from 'src/hooks/useAuth'
import { ICourses } from 'src/types/apps/courses'

const Page = () => {
  const { getAllMyCourses, store } = useCourses(null)

  useEffect(() => {
    getAllMyCourses({ query: '' })
  }, [])

  const { user } = useAuth()

  return (
    <>
      <Typography variant='h5' mb={5} textAlign={'center'}>
        All Courses Of {user?.first_name} {user?.last_name}
      </Typography>
      <Grid container spacing={10}>
        {store.status === 'pending' ? (
          <Box display={'block'} margin='0  auto' borderRadius={20} mt={10}>
            <Skeleton variant='rectangular' sx={{ height: '50vh', width: '80vw' }} />
          </Box>
        ) : store.status === 'success' && !store.entities.length ? (
          <DataNotFound />
        ) : (
          store?.entities?.map((item: ICourses) => {
            return (
              <Grid item xs={12} sm={6} md={6} lg={4} key={item?.id}>
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
          })
        )}
      </Grid>
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'my-courses-page'
}

export default Page
