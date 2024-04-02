import { Box, Tooltip, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { FlexBoxes, GraphBox, RightBox, SmallGrayText } from 'src/@core/constants/styles'
import { textOverflow } from 'src/@core/helper/text'
import { useDashboard } from 'src/@core/hooks/apps/useDashboard'
import { ICourses } from 'src/types/apps/courses'

const Page = () => {
  // Hooks

  const { store } = useDashboard()

  return (
    <GraphBox>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant='h6'>Top Courses</Typography>
        {/* <Typography variant='caption'>View All</Typography> */}
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
        {!store?.adminEntity?.popularCourses?.length ? (
          <Typography textAlign={'center'} mt={5}>
            No Records Exists
          </Typography>
        ) : (
          store?.adminEntity?.popularCourses?.map((item: ICourses) => {
            return (
              <FlexBoxes key={item.id}>
                <Link href={`channels/${item?.channelId}/courses`}>
                  <Tooltip title={`Click to view ${item?.courseName}`}>
                    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <Image
                        src={item?.thumbnail_url || '/images/avatars/dummy.png'}
                        alt='dummy'
                        height={'29px'}
                        width={'30px'}
                      />
                      <Typography variant='caption' sx={{ marginLeft: '10px' }}>
                        {textOverflow(item?.courseName, 40)}
                      </Typography>
                    </Box>
                  </Tooltip>
                </Link>
                {/* <RightBox>
              <Typography variant='body1' sx={{ display: 'block', color: 'white' }}>
                $2,125.00
              </Typography>
              <SmallGrayText>25 Sold</SmallGrayText>
            </RightBox> */}
              </FlexBoxes>
            )
          })
        )}
      </Box>
    </GraphBox>
  )
}

export default Page
