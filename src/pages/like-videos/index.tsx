import { Box, Card, CardContent, CardMedia, Divider, Grid, Skeleton, Tooltip, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useVideo } from 'src/@core/hooks/apps/useVideo'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Link from 'next/link'
import DataNotFound from 'src/@core/components/apps/channels/components/DataNotFound'
import { textOverflow } from 'src/@core/helper/text'
import { IVideo } from 'src/types/apps/video'
import { useTheme } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

const Page = () => {
  const { getAllLikedVideos, store } = useVideo(null)

  useEffect(() => {
    getAllLikedVideos()
  }, [])
  const theme = useTheme()

  return (
    <>
      <Typography variant='h5' mb={5}>
        Like Videos
      </Typography>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        style={{
          background: theme.palette.linear_gradient.cardGradient,
          borderRadius: '10px',
          padding: '20px'
        }}
      >
        {store?.status === 'success' ? (
          !store?.entities?.length ? (
            <DataNotFound />
          ) : (
            store?.entities?.map((videos: IVideo) => {
              return (
                <Grid item xs={12} md={6} lg={4} paddingBottom={'12px'} key={videos.id}>
                  <Item>
                    <Box
                      sx={{
                        display: 'flex',
                        maxHeight: '300px',
                        background: theme.palette.linear_gradient.cardGradient,
                        borderRadius: '10px',
                        overflowX: 'hidden'
                      }}
                    >
                      <Link href={`/watch/${videos?.id}`}>
                        <Tooltip title={`Click to watch the video`}>
                          <CardMedia
                            sx={{
                              objectFit: 'fill'
                            }}
                            component='img'
                            height='194'
                            style={{ width: '150px', cursor: 'pointer' }}
                            image={videos?.thumbnail_url || '/images/misc/no-results-found.webp'}
                            alt='Image'
                          />
                        </Tooltip>
                      </Link>
                      <CardContent>
                        <Link href={`/watch/${videos?.id}`}>
                          <Tooltip title={`Click to watch the video`}>
                            <Typography
                              component='p'
                              textAlign={'start'}
                              mb={3}
                              color={'white'}
                              sx={{ cursor: 'pointer' }}
                            >
                              {textOverflow(videos?.title, 22)}
                            </Typography>
                          </Tooltip>
                        </Link>
                        <Link href={`/channels/${videos?.channel?.id}`}>
                          <Tooltip title={`Click to view ${textOverflow(videos?.channel?.name, 20)} channel`}>
                            <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'pre-wrap' }}>
                              <Typography
                                component='p'
                                textAlign={'start'}
                                color={'white'}
                                fontWeight={600}
                                sx={{ cursor: 'pointer', overflowX: 'hidden' }}
                              >
                                {textOverflow(videos?.channel?.name, 22)}
                              </Typography>
                            </div>
                          </Tooltip>
                        </Link>
                        <Divider />
                        <Box display={'flex'}>
                          <FavoriteIcon color='error' />
                          <Typography component='p' textAlign={'start'} fontSize={'11px'} color={'white'} mt={1} ml={1}>
                            You Liked This Video
                          </Typography>
                        </Box>
                      </CardContent>
                    </Box>
                  </Item>
                </Grid>
              )
            })
          )
        ) : store.status === 'error' ? (
          <Typography variant='h5' textAlign={'center'}>
            An Error Occured
          </Typography>
        ) : (
          <Skeleton variant='rectangular' width={'100%'} height={'500px'} />
        )}
      </Grid>
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'like-videos-page'
}

export default Page
