import { Box, Typography } from '@mui/material'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import { textOverflow } from 'src/@core/helper/text'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { FlexBoxes, GraphBox, RightBox } from 'src/@core/constants/styles'
import { useTheme } from '@mui/material/styles'

const Page = () => {
  const {
    palette: {
      customColors: { white }
    }
  } = useTheme()

  return (
    <GraphBox>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant='h6'>Support Requests</Typography>
        <Typography variant='caption'>View All</Typography>
      </Box>

      <FlexBoxes>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar src={'/images/avatars/ellipse.png'} sx={{ mr: 3, width: 30, height: 30 }} />
          {/* <Image src='/images/avatars/ellipse.png' alt='dummy' height={'50px'} width={'50px'} /> */}
          <Box display={'flex'} flexDirection={'column'}>
            <Typography variant='caption' color={white} ml={'10px'}>
              Steve Smith
            </Typography>
            <Typography variant='caption' sx={{ marginLeft: '10px' }}>
              {textOverflow('Thanks for contact us with your issues...', 35)}
            </Typography>
            <Typography variant='caption' sx={{ marginLeft: '10px', color: white }}>
              6 min ago
            </Typography>
          </Box>
        </Box>
        <RightBox>
          <TaskAltIcon sx={{ background: white, color: 'black', borderRadius: '15px' }} />
        </RightBox>
      </FlexBoxes>
    </GraphBox>
  )
}

export default Page
