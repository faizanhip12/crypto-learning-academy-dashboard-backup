import { Card, Typography, CardContent, Grid, Stack } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { useTheme } from '@mui/material/styles'

const DataNotFound = () => {
  const {
    palette: {
      customColors: { white }
    }
  } = useTheme()
  return (
    <>
      <Grid item xs={12} md={3} sm={6}>
        <Card>
          <Image
            src={'/images/misc/no-results-found.webp'}
            width='600px'
            height='400px'
            alt='Video Image'
            objectFit='cover'
          />
          <CardContent sx={{ position: 'relative' }}>
            <Stack direction='row' height='40px' alignItems='center' sx={{ textAlign: 'center' }}>
              <Typography variant='body1' color={white} mr='10px' lineHeight='20px'>
                No Records Found
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default DataNotFound
