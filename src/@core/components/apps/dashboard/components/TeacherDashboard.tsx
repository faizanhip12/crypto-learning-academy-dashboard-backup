import React, { useEffect } from 'react'
import TeacherDashboardCard from './TeacherDashboardCard'
import { Grid, Typography } from '@mui/material'
import StarStudentCard from './StarStudentCard'
import PopularCoursesCard from './PopularCoursesCard'
import WatchTimeCard from './WatchTimeCard'
import { useAuth } from 'src/hooks/useAuth'
import { useDashboard } from 'src/@core/hooks/apps/useDashboard'

const TeacherDashboard = () => {
  // Hooks
  const { user } = useAuth()
  const { getTeacherDashboardData, store } = useDashboard()
  useEffect(() => {
    getTeacherDashboardData()
  }, [])

  return (
    <>
      <Typography variant='h6' textTransform={'capitalize'} textAlign={'center'}>
        {`${user?.first_name} ${user?.last_name}` || 'Sleave Johnson'}
      </Typography>
      <Typography variant='h3' textAlign={'center'}>
        Dashboard
      </Typography>
      <TeacherDashboardCard />
      <Grid container spacing={5} mt={0} justifyContent={'center'}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <StarStudentCard />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <PopularCoursesCard />
        </Grid>
      </Grid>
      {/* <Grid mt={5}>
        <WatchTimeCard />
      </Grid> */}
    </>
  )
}

export default TeacherDashboard
