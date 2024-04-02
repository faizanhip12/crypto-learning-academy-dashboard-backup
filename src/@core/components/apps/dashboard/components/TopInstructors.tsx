import { Box, Rating, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDashboard } from 'src/@core/hooks/apps/useDashboard'
import { IChannels } from 'src/types/apps/channels'
import { FlexBoxes, GraphBox, RightBox, SmallGrayText } from 'src/@core/constants/styles'
import { useTheme } from '@mui/material/styles'
import { renderClient } from 'src/@core/components/common/renderClient'
import { textOverflow } from 'src/@core/helper/text'

const Page = () => {
  const { getAllTopInstructors, topInstructors } = useDashboard()

  const {
    palette: {
      customColors: { white }
    }
  } = useTheme()

  useEffect(() => {
    getAllTopInstructors()
  }, [])

  return (
    <GraphBox>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant='h6'>Top Instructors</Typography>
        {/* <Typography variant='caption' sx={{ cursor: 'pointer' }}>
          View All
        </Typography> */}
      </Box>
      <Box
        sx={{
          height: '260px',
          overflowY: 'scroll',
          '::-webkit-scrollbar': {
            width: '2px'
          },
          '&:empty': {
            height: 'auto'
          }
        }}
      >
        {!topInstructors?.length ? (
          <Typography textAlign={'center'} mt={5}>
            No Records Exists
          </Typography>
        ) : (
          topInstructors?.map((instructors: IChannels) => {
            return (
              <FlexBoxes key={instructors.id}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {renderClient(instructors?.profile_picture, instructors?.first_name + ' ' + instructors?.last_name)}
                  <Box display={'flex'} flexDirection={'column'} marginLeft={'10px'}>
                    <Typography variant='caption' color={white}>
                      {textOverflow(instructors?.first_name + ' ' + instructors?.last_name, 27) || 'No Name Found'}
                    </Typography>
                    <Typography variant='caption'>{instructors?.email}</Typography>
                  </Box>
                </Box>
                <RightBox sx={{ marginRight: 2 }}>
                  <Box sx={{ color: 'white' }}>
                    <Rating
                      name='read-only'
                      value={parseInt(instructors.reviews as string) || 0}
                      readOnly
                      size='small'
                    />
                  </Box>
                  <SmallGrayText>{Math.round(instructors.reviews as number).toFixed()} Reviews</SmallGrayText>
                </RightBox>
              </FlexBoxes>
            )
          })
        )}
      </Box>
    </GraphBox>
  )
}

export default Page
