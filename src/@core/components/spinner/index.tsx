// ** MUI Import
import Box from '@mui/material/Box'
import Image from 'next/image'

const FallbackSpinner = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Image src={'/images/logos/smart-chain-loader.gif'} width={200} height={200} style={{ marginTop: 5 }} />
    </Box>
  )
}

export default FallbackSpinner
