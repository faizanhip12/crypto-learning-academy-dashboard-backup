// ** MUI Imports
import Typography from '@mui/material/Typography'
import { CardBoxSingle } from 'src/@core/constants/styles'
import { Box, Grid } from '@mui/material'
import Image from 'next/image'
import { useTheme } from '@mui/material/styles'
import { useDashboard } from 'src/@core/hooks/apps/useDashboard'
import { useAuth } from 'src/hooks/useAuth'

const CongratulationCard = () => {
  // Hooks
  const {
    palette: {
      customColors: { white }
    }
  } = useTheme()

  return (
    <Grid container spacing={5} mt={0}>
      <CardBoxSingle>
        <Box>
          <Grid container pt={5}>
            <Typography variant='h6' color={white}>
              Congratulations Sleave!
            </Typography>
            <Typography variant='body2' pb={5}>
              {' '}
              Best viewer of this month{' '}
            </Typography>
          </Grid>
          <Typography variant='h2' color={white} pt={8} pb={8}>
            $11.8k{' '}
          </Typography>
          <Typography variant='body2' pt={5} pb={5}>
            {' '}
            You’re 78% of the top viewers
          </Typography>
        </Box>

        <Box>
          <Image width={150} height={200} alt='Upgrade Account' src='/images/cards/studenttrophy.png' />
        </Box>
      </CardBoxSingle>
    </Grid>
  )
}

export default CongratulationCard
