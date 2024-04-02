import { useEffect, useMemo, useState } from 'react'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** import custom hooks
import useAsync from 'src/@core/hooks/useAsync'
import { RootState, AppDispatch } from 'src/store'

import { videoSchema } from 'src/@core/schema'

import { ApiParams } from 'src/types/api'

// ** import API services
import { csvDownload } from 'src/@core/helper/csv-export'

// ** Actions Imports
import {
  fetchAllAction,
  fetchOneAction,
  addAction,
  updateAction,
  deleteAction,
  fetchOneActionByPlaylistId,
  fetchAllByPlaylist,
  fetchAllLikedVideosAction,
  fetchAllSavedVideosAction,
  startVideoStreamingAction,
  addLikesOnVideo,
  addSaveFlagOnVideo,
  createLiveVideoEventAction
} from 'src/store/apps/video'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { VideoService } from 'src/services'
import { useCourses } from './useCourses'
import { useRouter } from 'next/router'

const defaultValues = {
  name: ''
}

export const useVideo = (serviceId: string | null) => {
  // ** Hook
  const { handleDrawer, handleModal } = useToggleDrawer()
  const { form: coursesForm } = useCourses(null)
  const store = useSelector((state: RootState) => state.video)
  const dispatch = useDispatch<AppDispatch>()
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
  const { query } = useRouter()

  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(videoSchema.add)
  })

  // useEffect(() => {
  //   serviceId && dispatch(fetchOneAction(serviceId))
  // }, [serviceId])

  useMemo(() => {
    if (store?.entity && serviceId) {
      'name' in store.entity && form.setValue('name', store.entity.name)
    } else {
      form.reset()
    }
  }, [store?.entity, serviceId])

  const getVideoBySlug = async (id: string, playlistId: string) => {
    dispatch(fetchOneAction({ id, playlistId }))
  }

  const startVideoStreaming = async (id: string) => {
    await dispatch(startVideoStreamingAction({ id, playlistId: query?.id as string }))
  }

  const getAllVideosByChannelId = async ({ channelId }: { channelId: string }) => {
    dispatch(fetchAllAction({ query: channelId }))
  }

  const getAboutByChannelId = async ({ channelId }: { channelId: string }) => {
    dispatch(fetchAllAction({ query: channelId }))
  }

  const getAllLikedVideos = async () => {
    dispatch(fetchAllLikedVideosAction({ query: '' }))
  }

  const getAllSavedVideos = async () => {
    dispatch(fetchAllSavedVideosAction({ query: '' }))
  }

  const getAllVideosByPlaylistId = async (playlistId: { playlistId: string }) => {
    dispatch(fetchAllByPlaylist({ query: playlistId }))
  }

  const likeVideoById = async (id: string) => {
    setStatus('pending')
    dispatch(addLikesOnVideo(id)).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        setStatus('success')
        form.reset()
        // handleDrawer(null)
      } else {
        setStatus('error')
      }
    })
    // setStatus('pending')
    // VideoService.getLikeStatus(id).then(({ data: payload }) => {
    //   if (payload?.statusCode === '10000') {
    //     setStatus('success')
    //     // handleDrawer(null)
    //     dispatch(fetchOneAction(id))
    //   } else {
    //     setStatus('error')
    //     // console.log('============API_ERROR===============')
    //     // console.log(payload)
    //     // console.log('====================================')
    //   }
    // })
  }

  const saveVideoById = async (id: string) => {
    setStatus('pending')
    dispatch(addSaveFlagOnVideo(id)).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        setStatus('success')
        form.reset()
        // handleDrawer(null)
      } else {
        setStatus('error')
      }
    })
  }
  const createLiveVideoEvent = async (data: any) => {
    const { payload } = await dispatch(createLiveVideoEventAction({ ...data }))
    if (payload.statusCode === '10000') {
      return payload
    }
    // dispatch(createLiveVideoEventAction({ ...data })).then(({ payload }: any) => {
    //   if (payload?.statusCode === '10000') {
    //     console.log('first')
    //     form.reset()
    //     coursesForm.reset()
    //     // handleDrawer(null)
    //   } else {
    //   }
    // })
    // setStatus('pending')
    // VideoService.getSaveStatus(id).then(({ data: payload }) => {
    //   if (payload?.statusCode === '10000') {
    //     setStatus('success')
    //     dispatch(fetchOneAction(id))
    //     // handleDrawer(null)
    //   } else {
    //     setStatus('error')
    //     // console.log('============API_ERROR===============')
    //     // console.log(payload)
    //     // console.log('====================================')
    //   }
    // })
  }

  const addVideo = async (data: any) => {
    dispatch(addAction({ ...data })).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        form.reset()
        handleDrawer(null)
      } else {
      }
    })
  }

  const updateVideo = async (id: string, data: any) => {
    dispatch(updateAction({ id, data })).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        form.reset()
        handleDrawer(null)
      } else {
      }
    })
  }

  const deleteVideo = async (id: string) => {
    dispatch(deleteAction(id)).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        handleModal(null)
      } else {
      }
    })
  }

  const exportVideo = async () => {
    csvDownload('videos', store.entities)
  }

  return {
    form,
    store,
    getVideoBySlug,
    likeVideoById,
    getAllVideosByChannelId,
    getAllVideosByPlaylistId,
    getAllLikedVideos,
    addVideo,
    updateVideo,
    deleteVideo,
    exportVideo,
    getAllSavedVideos,
    saveVideoById,
    getAboutByChannelId,
    startVideoStreaming,
    createLiveVideoEvent,
    status
  }
}
