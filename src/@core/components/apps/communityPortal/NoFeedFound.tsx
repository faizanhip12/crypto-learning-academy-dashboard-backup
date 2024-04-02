import * as React from 'react'
import { Box, Typography, CardMedia, CardContent, Card } from '@mui/material'

const NoFeedFound = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ maxWidth: 800, m: 2, minWidth: '100%' }}>
        <CardContent>
          {
            <Typography variant='h5' textAlign={'center'} color='text.secondary' component='p'>
              Feeds Not Available
            </Typography>
          }
        </CardContent>
        {<CardMedia component='img' height='300' image='/images/misc/no-results-found.webp' alt='Data Not Found' />}
      </Card>
    </Box>
  )
}

export default NoFeedFound
