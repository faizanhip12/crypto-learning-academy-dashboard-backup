import React, { Fragment, useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import TopInstructors from 'src/@core/components/apps/dashboard/components/TopInstructors'
import TopCourses from 'src/@core/components/apps/dashboard/components/TopCourses'
import SupportRequests from 'src/@core/components/apps/dashboard/components/SupportRequests'
import StudentsEnrollmentStats from 'src/@core/components/apps/dashboard/components/StudentsEnrollmentStats'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import DonutChart from 'src/@core/components/apps/dashboard/components/DonutChart'
import { GraphBox, SmallGrayText } from 'src/@core/constants/styles'
import dynamic from 'next/dynamic'
import { useDashboard } from 'src/@core/hooks/apps/useDashboard'
import { useTheme } from '@mui/material/styles'
import WavebarChart from 'src/@core/components/apps/dashboard/components/WavebarChart'

const ApexChart = dynamic(() => import('src/@core/components/apps/dashboard/components/ApexChart'), {
  ssr: false
})

const AdminDashboard = () => {
  const { getAdminDashboardData, store } = useDashboard()

  useEffect(() => {
    getAdminDashboardData()
  }, [])

  const {
    palette: {
      customColors: { grey, white }
    }
  } = useTheme()

  return (
    <Fragment>
      <Typography variant='h4' textAlign={'center'}>
        Dashboard
      </Typography>
      <Typography variant='h6' color={grey} textAlign={'center'}>
        Welcome To Learning Management Dashboard
      </Typography>
      <Grid container spacing={5} mt={0}>
        <Grid item xl={6} lg={6} md={12} xs={12} mt={0}>
          <StudentsEnrollmentStats />
        </Grid>
        <Grid item lg={3} md={6} xs={12}>
          <GraphBox>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Box>
                <SmallGrayText>Total Sales</SmallGrayText>
                <Typography variant='h6'>
                  ${store.adminEntity?.thisMonthSale ? store.adminEntity?.thisMonthSale : 0}
                  {/* ${totalSalesMonthly ? totalSalesMonthly?.totalSales?.toFixed(2) : 0} */}
                </Typography>
              </Box>
              <Box textAlign={'right'}>
                <Box display={'flex'} justifyContent={'flex-end'}>
                  <ArrowUpwardIcon color='success' />
                  <Typography color='greenyellow'>
                    {store.adminEntity?.monthSaleRaisePercentage
                      ? store.adminEntity?.monthSaleRaisePercentage?.toFixed(2)
                      : 0}
                    %{/* {totalSalesMonthly ? totalSalesMonthly?.percentageChange?.toFixed(2) : 0}% */}
                  </Typography>
                </Box>
                <SmallGrayText>vs. last month</SmallGrayText>
              </Box>
            </Box>
            <WavebarChart
              white={white}
              warning={'#FF8A00'}
              primary={'#FF8A00'}
              success={'greenyellow'}
              labelColor={'transparent'}
              borderColor={'transparent'}
              gridLineColor={'transparent'}
            />
          </GraphBox>
        </Grid>
        <Grid item lg={3} md={6} xs={12}>
          <GraphBox>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Box>
                <SmallGrayText>This week so far</SmallGrayText>
                <Typography variant='h6'>
                  ${store.adminEntity?.thisWeekSale ? store.adminEntity?.thisWeekSale : 0}
                  {/* ${totalSalesWeekly ? totalSalesWeekly?.sumOfPricesWeekly?.toFixed(2) : 0} */}
                </Typography>
              </Box>
              <Box textAlign={'right'}>
                <Box display={'flex'} justifyContent={'flex-end'}>
                  <ArrowUpwardIcon color='success' />
                  <Typography color='greenyellow'>
                    {store.adminEntity?.weekSaleRaisePercentage
                      ? store.adminEntity?.weekSaleRaisePercentage?.toFixed(2)
                      : 0}
                    %{/* {totalSalesWeekly ? totalSalesWeekly?.percentageChange?.toFixed(2) : 0}% */}
                  </Typography>
                </Box>
                <Box display={'flex'} justifyContent={'flex-end'}>
                  <SmallGrayText>vs. last month</SmallGrayText>
                </Box>
              </Box>
            </Box>
            <WavebarChart
              white={white}
              warning={'#FF8A00'}
              primary={'#FF8A00'}
              success={'greenyellow'}
              labelColor={'transparent'}
              borderColor={'transparent'}
              gridLineColor={'transparent'}
            />
          </GraphBox>
        </Grid>
      </Grid>
      <Grid container spacing={5} mt={0} justifyContent={'center'}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <TopCourses />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <TopInstructors />
        </Grid>
      </Grid>
      {/* <Grid spacing={5} container mt={0}>
        <Grid item lg={8} md={6} xs={12}>
          <GraphBox>
            <Typography variant='h6'>Active Students</Typography>
            <Typography variant='body2' color={theme.palette.customColors.grey}>
              How do your students visited in the time.
            </Typography>
            <Box display={'flex'} justifyContent={'center'}>
              <Box mt={5} mr={'auto'}>
                <Typography variant='body2' color={theme.palette.customColors.grey}>
                  Monthly
                </Typography>
                <Typography component='caption'>9.28K</Typography>
                <Box display={'flex'} paddingLeft={-2}>
                  <ArrowUpwardIcon color='success' />
                  <Typography color='greenyellow'>4.63%</Typography>
                </Box>
              </Box>
              <Box mt={5} justifyContent={'center'} mr={'auto'}>
                <Typography variant='body2' color={theme.palette.customColors.grey}>
                  Monthly
                </Typography>
                <Typography component='caption'>9.28K</Typography>
                <Box display={'flex'} paddingLeft={-2}>
                  <ArrowUpwardIcon color='success' />
                  <Typography color='greenyellow'>4.63%</Typography>
                </Box>
              </Box>
              <Box mt={5}>
                <Typography variant='body2' color={theme.palette.customColors.grey}>
                  Monthly
                </Typography>
                <Typography component='caption'>9.28K</Typography>
                <Box display={'flex'} paddingLeft={-2}>
                  <ArrowUpwardIcon color='success' />
                  <Typography color='greenyellow'>4.63%</Typography>
                </Box>
              </Box>
            </Box>
            <ApexChart />
          </GraphBox>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GraphBox>
            <Box display={'flex'} pb={15}>
              <Typography variant='h6'>Traffic Sources</Typography>
              <Typography variant='body2' color={theme.palette.customColors.grey} ml={'auto'}>
                30 Days
              </Typography>
            </Box>
            <Box display={'flex'} width={'100%'}>
              <DonutChart />
            </Box>
          </GraphBox>
        </Grid>
      </Grid> */}
    </Fragment>
  )
}

export default AdminDashboard
