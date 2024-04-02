// ** MUI Imports
import Typography from '@mui/material/Typography'
import { CardBoxSingle } from 'src/@core/constants/styles'
import { Box, Grid } from '@mui/material'
import Image from 'next/image'
import { useTheme } from '@mui/material/styles'
import { useDashboard } from 'src/@core/hooks/apps/useDashboard'

const TeacherDashboardCard = () => {
  const {
    palette: {
      customColors: { white }
    }
  } = useTheme()

  const { store } = useDashboard()

  return (
    <Grid container spacing={5} mt={0} justifyContent={'center'}>
      <Grid item lg={4} md={4} sm={6} xs={12}>
        <CardBoxSingle>
          <Box>
            <Typography variant='body2'>Students</Typography>
            <Typography variant='h4' color={white}>
              {store.teacherEntity?.teacherStudentsCount || 0}{' '}
            </Typography>
          </Box>
          <Box>
            <Image width={150} height={150} alt='Upgrade Account' src='/images/cards/card111.png' />
          </Box>
        </CardBoxSingle>
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={12}>
        <CardBoxSingle>
          <Box>
            <Typography variant='body2'>Certificates</Typography>
            <Typography variant='h4' color={white}>
              {store.teacherEntity?.teacherStudentCertificatesCount > 100
                ? '100+'
                : store.teacherEntity?.teacherStudentCertificatesCount || 0}
            </Typography>
          </Box>
          <Box>
            <Image width={150} height={150} alt='Upgrade Account' src='/images/cards/card222.png' />
          </Box>
        </CardBoxSingle>
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={12}>
        <CardBoxSingle>
          <Box>
            <Typography variant='body2'>Courses</Typography>
            <Typography variant='h4' color={white}>
              {' '}
              {store.teacherEntity?.teacherCoursesCount > 10 ? '10+' : store.teacherEntity?.teacherCoursesCount || 0}
            </Typography>
          </Box>
          <Box>
            <Image width={150} height={150} alt='Upgrade Account' src='/images/cards/card333.png' />
          </Box>
        </CardBoxSingle>
      </Grid>
    </Grid>
  )
}

export default TeacherDashboardCard
