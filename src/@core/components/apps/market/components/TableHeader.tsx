// ** MUI Imports
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

const TableHeader = () => {
  return (
    <Box sx={{ p: 5 }}>
      <Typography variant='h5' textAlign={'center'}>
        Best Coin Price Tracker on the Market
      </Typography>
      {/* <Box display={'flex'}>
        <Box display={'flex'} flexDirection={'column'}>
          <Typography variant='body1' marginTop={5} sx={{ color: 'GrayText', textAlign: 'start' }}>
            Market
          </Typography>
          <Box display={'flex'}>
            <Typography variant='h6' marginTop={2}>
              $1,556
              <Box component={'span'} marginLeft={'20px'} color={'red'}>
                -1.78% <ArrowDownwardIcon color='error' />
              </Box>
            </Typography>
          </Box>
        </Box>
        <Box textAlign={'center'} margin={'auto'}>
          <Typography variant='body1' marginTop={5} sx={{ color: 'GrayText' }}>
            Volume 24 h
          </Typography>
          <Typography variant='h6' marginTop={2}>
            $1,556 <ArrowUpwardIcon color='success' />
          </Typography>
        </Box>
        <Box textAlign={'center'}>
          <Typography variant='body1' marginTop={5} sx={{ color: 'GrayText', textAlign: 'start' }}>
            BTC Dominance
          </Typography>
          <Box display={'flex'}>
            <Typography variant='h6' marginTop={2}>
              $59.76%
              <Box component={'span'} marginLeft={'20px'} color={'red'}>
                -0.32% <ArrowDownwardIcon color='error' />
              </Box>
            </Typography>
          </Box>
        </Box>
        <Box textAlign={'center'} marginLeft={'auto'}>
          <Typography variant='body1' marginTop={5} sx={{ color: 'GrayText' }}>
            BTC Dominance
          </Typography>
          <Typography variant='h6' marginTop={2}>
            $59.76% 
          </Typography>
        </Box>
      </Box> */}
    </Box>
  )
}

export default TableHeader
