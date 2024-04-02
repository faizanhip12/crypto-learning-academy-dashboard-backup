import React, { useEffect } from 'react'
import { Grid, Typography } from '@mui/material'
import WatchVideo from './WatchVideo'
import PointsPaint from './PointsPaint'
import InviteFriends from './InviteFriends'
import { useAuth } from 'src/hooks/useAuth'
import { useDashboard } from 'src/@core/hooks/apps/useDashboard'
import StudentCounts from './StudentCounts'

const StudentDashboard = () => {
  //Hooks

  const { user } = useAuth()
  const { getStudentDashboardData } = useDashboard()
  useEffect(() => {
    getStudentDashboardData()
  }, [])

  return (
    <>
      <Grid item justifyContent={'center'}>
        <Typography variant='h6' textTransform={'capitalize'} textAlign={'center'}>
          {`${user?.first_name} ${user?.last_name}` || 'Sleave Johnson'}
        </Typography>
        <Typography variant='h3' textAlign={'center'}>
          Dashboard
        </Typography>
      </Grid>
      {/* <Grid container spacing={5} mt={0} justifyContent={'center'}>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <CongratulationCard />
        </Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <TimelineGraphy />
        </Grid>
      </Grid> */}
      <Grid container spacing={10} mt={0} justifyContent={'space-between'}>
        <Grid item lg={6} md={6} sm={12} xs={12} paddingTop={0} className='abc'>
          <PointsPaint />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <InviteFriends />
        </Grid>
      </Grid>
      <WatchVideo />
      <StudentCounts />
    </>
  )
}

export default StudentDashboard
