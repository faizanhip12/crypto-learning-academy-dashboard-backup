import { Box, Grid, Tooltip, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { CardBoxSingle } from 'src/@core/constants/styles'
import { useDashboard } from 'src/@core/hooks/apps/useDashboard'
import { IWatchedVideo } from 'src/types/apps/dashboard'
import { useRouter } from 'next/router'
import { textOverflow } from 'src/@core/helper/text'

const WatchVideo = () => {
  // Hooks

  const { store } = useDashboard()
  const { push } = useRouter()

  return (
    <>
      {/* <Grid container spacing={5} mt={5}>
        <CardBoxSingle>
          <Grid>
            <Typography variant='h5' color={theme.palette.customColors.white} pt={5}>
              Videos Watched
            </Typography>
            <Typography variant='body2' pb={10}>
              You watched videos of this month
            </Typography>

            <Image src={'/images/cards/watchvideo.png'} width={'150'} height={'150'} />
            <Image src={'/images/cards/watchvideo.png'} width={'150'} height={'150'} />
            <Image src={'/images/cards/watchvideo.png'} width={'150'} height={'150'} />
            <Image src={'/images/cards/watchvideo.png'} width={'150'} height={'150'} />
            <Image src={'/images/cards/watchvideo.png'} width={'150'} height={'150'} />
            <Image src={'/images/cards/watchvideo.png'} width={'150'} height={'150'} />
          </Grid>
        </CardBoxSingle>
      </Grid> */}
      <Grid container spacing={5} mt={5}>
        <CardBoxSingle>
          <Box sx={{ pb: 5, width: '100%' }}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='h5' color={'#ffff'} pt={5}>
                  Videos Watched
                </Typography>
                {store.studentEntity?.studentVideosWatched?.length ? (
                  <Typography variant='body2' pb={5}>
                    You watched videos of this month
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
            <Grid container spacing={5} justifyContent={'center'}>
              {!store.studentEntity?.studentVideosWatched?.length ? (
                <Grid item>
                  <Typography mt={5}>You Haven't Watched Any Videos Yet</Typography>
                </Grid>
              ) : (
                store.studentEntity?.studentVideosWatched?.map((watchedVideo: IWatchedVideo) => {
                  return (
                    <Grid item lg={2} md={4} sm={6} key={watchedVideo.videoId}>
                      <Tooltip title={`Click to watch ${textOverflow(watchedVideo?.title, 20)} video`}>
                        <Box
                          sx={{
                            background: 'linear-gradient(135.45deg, #363636 11.55%, #0c0c0c 101.52%)',
                            overflow: 'hidden',
                            borderRadius: 1,
                            cursor: 'pointer'
                          }}
                          onClick={() => push(`course/${watchedVideo?.playlistId}/video/${watchedVideo?.videoId}`)}
                        >
                          <Image
                            src={watchedVideo?.thumbnail_url || '/images/cards/teacher.png'}
                            width={500}
                            height={400}
                            objectFit='cover'
                            priority={true}
                          />
                          <Box sx={{ padding: 2 }}>
                            <Typography variant='body2'>{watchedVideo?.title || 'HTML CSS JAVASCRIPT'}</Typography>
                          </Box>
                        </Box>
                      </Tooltip>
                    </Grid>
                  )
                })
              )}
            </Grid>
          </Box>
        </CardBoxSingle>
      </Grid>
    </>
  )
}

export default WatchVideo
