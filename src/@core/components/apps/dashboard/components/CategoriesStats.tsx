import { Box, Grid, Typography } from '@mui/material'
import ApexBarChart from './ApexbarChat'
import { GraphBox } from 'src/@core/constants/styles'
import { useTheme } from '@mui/material/styles'

const Page = () => {
  const {
    palette: {
      customColors: { grey }
    }
  } = useTheme()

  return (
    <GraphBox>
      <Typography variant='h6'>Top Categories</Typography>
      <Typography variant='body2' color={grey}>
        In last 15 days buy and sells overview.
      </Typography>
      <ApexBarChart />
    </GraphBox>
  )
}

export default Page
