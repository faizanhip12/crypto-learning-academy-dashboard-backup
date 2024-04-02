// ** React Imports
import { useEffect } from 'react'
import Script from 'next/script'
// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import TableHeader from 'src/@core/components/apps/market/components/TableHeader'
import Table from 'src/@core/components/apps/market/components/Table'
import DeleteAlert from 'src/@core/components/common/deleteAlert'

// ** Import Custom hooks
import { Box } from '@mui/material'

const Page = () => {
  // ** Hooks

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TableHeader />
      </Grid>
      <Grid item xs={12}>
        <Table />
        <Script src='https://static.coinstats.app/widgets/coin-price-widget.js' strategy='beforeInteractive' />
        <Script src='https://static.coinstats.app/widgets/coin-price-widget.js' strategy='beforeInteractive' />
        <Script src='https://static.coinstats.app/widgets/portfolio-widget.js' strategy='beforeInteractive' />
        <Script src='https://static.coinstats.app/widgets/coin-price-marquee-widget.js' strategy='beforeInteractive' />
        <Script async src='https://static.coinstats.app/widgets/coin-chart-widget.js' />
        {/* @ts-ignore */}
        <coin-stats-chart-widget
          type='large'
          coin-id='bitcoin'
          width='100%'
          chart-height='300'
          currency='PKR'
          locale='en'
          bg-color='#1C1B1B'
          text-color='#FFFFFF'
          status-up-color='#74D492'
          status-down-color='#FE4747'
          buttons-color='#1C1B1B'
          chart-color='#FFA959'
          chart-gradient-from='rgba(255,255,255,0.07)'
          chart-gradient-to='rgba(0,0,0,0)'
          chart-label-background='#000000'
          candle-grids-color='rgba(255,255,255,0.1)'
          border-color='rgba(255,255,255,0.15)'
          font='Roboto, Arial, Helvetica'
          btc-color='#6DD400'
          eth-color='#67B5FF'

          // @ts-ignore
        ></coin-stats-chart-widget>
        {/* @ts-ignore */}
        {/* <coin-stats-ticker-widget
          type='large'
          coin-id='bitcoin'
          locale='en'
          width={'500px'}
          currency='PKR'
          background='#1C1B1B'
          text-color='#FFFFFF'
          border-color='rgba(255,255,255,0.15)'
          font='Roboto, Arial, Helvetica'
          height='182'
          rank-background='#FFA959'
          status-up-color='#74D492'
          status-down-color='#FE4747'
          rank-text-color='#1C1B1B'
          // @ts-ignore
        ></coin-stats-ticker-widget> */}
      </Grid>
    </Grid>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'market-page'
}

export default Page
