// ** MUI Imports
import Typography from '@mui/material/Typography'
import { CardBoxSingle } from 'src/@core/constants/styles'
import { Box, Grid } from '@mui/material'
import Image from 'next/image'
import { useTheme } from '@mui/material/styles'
import { useDashboard } from 'src/@core/hooks/apps/useDashboard'

const StudentCounts = () => {
  // Hooks

  const {
    palette: {
      customColors: { white }
    }
  } = useTheme()

  const { store } = useDashboard()

  return (
    <Grid container spacing={5} mt={0} justifyContent={'space-between'}>
      <Grid item lg={6} md={6} sm={12} xs={12} paddingLeft={'0 !important'}>
        <CardBoxSingle>
          <Box>
            <Typography variant='body2'>Daily Login Streak</Typography>
            <Typography variant='h4' color={white}>
              {store.studentEntity?.dailyLoginStreakCount || 0}{' '}
            </Typography>
          </Box>
          <Box>
            <Image width={150} height={150} alt='Upgrade Account' src='/images/cards/card111.png' priority={true} />
          </Box>
        </CardBoxSingle>
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <CardBoxSingle>
          <Box>
            <Typography variant='body2'>Certificates</Typography>
            <Typography variant='h4' color={white}>
              {store.studentEntity?.certificationCount > 100 ? '100+' : store.studentEntity?.certificationCount || 0}
            </Typography>
          </Box>
          <Box>
            <Image width={150} height={150} alt='Upgrade Account' src='/images/cards/card222.png' priority={true} />
          </Box>
        </CardBoxSingle>
      </Grid>
    </Grid>
  )
}

export default StudentCounts
