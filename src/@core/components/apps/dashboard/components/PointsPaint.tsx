// ** MUI Imports
import Typography from '@mui/material/Typography'
import { CardBoxSingle } from 'src/@core/constants/styles'
import { Box, Grid, Table, TableBody, TableCell, TableRow } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useDashboard } from 'src/@core/hooks/apps/useDashboard'
import { IMonthlyData } from 'src/types/apps/dashboard'

const PointsPaint = () => {
  // Hooks

  const {
    palette: {
      customColors: { white }
    }
  } = useTheme()
  const { store } = useDashboard()

  return (
    <Grid container spacing={5} mt={0}>
      <CardBoxSingle sx={{ paddingY: 3, minHeight: 245, width: '100%' }}>
        <Box>
          <Typography variant='h6' color={white}>
            Points Earned
          </Typography>
          <Typography variant='body2' pb={5}>
            {' '}
            You earn points in this platform{' '}
          </Typography>
          <Typography variant='h2' color={white} pt={8} pb={8}>
            {store.studentEntity?.studentPoints?.totalPoints > 1000
              ? '1K+'
              : store.studentEntity?.studentPoints?.totalPoints || 0}
            {/* 60.1K{' '} */}
          </Typography>
        </Box>
        <Box
          sx={{
            maxHeight: '200px',
            overflowY: 'auto',
            overflowX: 'hidden',
            '::-webkit-scrollbar': {
              width: '2px'
            }
          }}
        >
          <Table>
            <TableBody>
              {store.studentEntity?.studentPoints?.monthlyBasis?.map((monthlyData: IMonthlyData, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell sx={{ padding: '.4rem 1rem !important' }}>
                      <Typography variant='body1'>{monthlyData?.monthName || 'Jan'}</Typography>
                    </TableCell>
                    <TableCell sx={{ padding: '.4rem 1rem !important' }}>
                      <Typography variant='body1'>{monthlyData?.totalPoints || 0}</Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Box>
        {/* 
        <Box>
          <Typography variant='h2' color={theme.palette.customColors.white} pt={8} pb={8}>
            {store.studentEntity?.totalPoints > 1000 ? '1K+' : store.studentEntity?.totalPoints || 0}
          </Typography>
        </Box> */}
      </CardBoxSingle>
    </Grid>
  )
}

export default PointsPaint
