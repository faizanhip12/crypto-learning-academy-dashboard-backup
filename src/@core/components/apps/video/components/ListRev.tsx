import React, { useEffect } from 'react'

// ** MUI
import Grid from '@mui/material/Grid'
import { Skeleton, Typography } from '@mui/material'

// ** components
import VideoCard from 'src/@core/components/apps/video/components/Card'
import DataNotFound from '../../channels/components/DataNotFound'

// **hooks
import { useVideo } from 'src/@core/hooks/apps/useVideo'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const VideosListRev: React.FC = () => {
  // Hooks

  const {
    query: { id, slug }
  } = useRouter()

  const { store, getAllVideosByPlaylistId } = useVideo(null)

  useEffect(() => {
    getAllVideosByPlaylistId(id as any)
  }, [id])

  return (
    <Grid container item rowSpacing={10} columnSpacing={5}>
      {store.status === 'error' ? (
        <Typography variant='h4' mt={5}>
          An Error Occured
        </Typography>
      ) : store.status === 'success' && !store.entities.length ? (
        <DataNotFound />
      ) : store?.status === 'success' ? (
        store?.entities?.map((item, index) => (
          <Grid item xs={12} md={4} sm={6} lg={4} xl={3} key={index}>
            <VideoCard video={item} key={index} />
          </Grid>
        ))
      ) : (
        <Skeleton variant='rectangular' sx={{ minWidth: '100%', height: '50vh', width: '100%' }} />
      )}
    </Grid>
  )
}

export default VideosListRev
