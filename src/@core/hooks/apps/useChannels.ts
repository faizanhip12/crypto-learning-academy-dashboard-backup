import { useEffect, useMemo, useState } from 'react'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** import custom hooks
import useAsync from 'src/@core/hooks/useAsync'
import { RootState, AppDispatch } from 'src/store'

import { channelSchema } from 'src/@core/schema'

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
  getChannelAction,
  fetchMyChannelAction,
  fetchAllActionAbout,
  Slice
} from 'src/store/apps/channels'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { ChannelService } from 'src/services'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'

const defaultValues = {
  name: '',
  slug: '',
  about: '',
  thumnail_url: ''
}

export const useChannels = (serviceId: string | null) => {
  // ** Hook
  const { handleDrawer, handleModal } = useToggleDrawer()
  const store = useSelector((state: RootState) => state.channels)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const [status, setStatus] = useState('idle')

  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(channelSchema.add)
  })

  useEffect(() => {
    serviceId && dispatch(fetchOneAction(serviceId))
  }, [serviceId])

  useMemo(() => {
    if (store?.entity && serviceId) {
      'name' in store?.entity && form.setValue('name', store?.entity?.name)
      'slug' in store?.entity && form.setValue('slug', store?.entity?.slug)
      'about' in store?.entity && form.setValue('about', store?.entity?.about)
      'thumnail_url' in store?.entity && form.setValue('thumnail_url', store?.entity?.thumnail_url)
    } else {
      form.reset()
    }
  }, [store?.entity, serviceId])

  const getChannels = async (id: string) => {
    dispatch(fetchOneAction(id))
  }

  const getAllChannels = async ({ query }: ApiParams) => {
    dispatch(fetchAllAction({ query }))
  }

  const getChannelsAbout = async (query: ApiParams) => {
    dispatch(fetchAllActionAbout(query))
  }

  const getMyChannels = async (query: ApiParams) => {
    dispatch(fetchMyChannelAction(query))
  }

  const addChannel = async (data: any) => {
    const { payload } = await dispatch(addAction({ ...data }))
    if (payload?.statusCode === '10000') {
      handleDrawer(null)
      form.reset()
      return payload
    } else {
    }
  }

  const subscribeChannelByUserId = async (id: string) => {
    dispatch(Slice.actions.handleStatus('pending'))
    const { data } = await ChannelService.subscribeByChannelId(id)
    if (data?.statusCode === '10000') {
      toast.success(data?.message || 'Subscribe success')
      dispatch(Slice.actions.handleStatus('success'))
      return data
    }
  }

  // const subscribeChannelsById = async (id: string, actionCallback?: 'ALL' | 'ONE') => {
  //   ChannelService.subscribeByChannelId(id).then(({ data: payload }) => {
  //     if (payload?.statusCode === '10000') {
  //       handleDrawer(null)
  //       if (actionCallback === 'ALL') {
  //         handleDrawer(null)
  //         dispatch(fetchAllAction({ query: '' }))
  //       } else if (actionCallback === 'ONE') {
  //         handleDrawer(null)
  //         dispatch(fetchOneAction(id))
  //       }
  //     } else {
  //     }
  //   })
  // }

  const subscribeChannelsById = async (id: string, actionCallback?: 'ALL' | 'ONE') => {
    setStatus('pending')
    const { data }: any = await ChannelService.subscribeByChannelId(id)
    if (data?.statusCode === '10000') {
      toast.success(data?.message || 'Subscribe success')
      setStatus('success')
      handleDrawer(null)
      if (actionCallback === 'ALL') {
        handleDrawer(null)
        setStatus('success')
        dispatch(fetchAllAction({ query: '' }))
        return data
      } else if (actionCallback === 'ONE') {
        setStatus('success')
        handleDrawer(null)
        dispatch(fetchOneAction(id))
        return data
      }
    } else {
      setStatus('error')
    }
  }

  const getChannelById = async (id: any) => {
    dispatch(fetchOneAction(id)).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        form.reset()
      } else {
        // console.log('============API_ERROR===============')
        // console.log(payload)
        // console.log('====================================')
      }
    })
  }

  const updateChannelById = async (id: string, data: any) => {
    dispatch(updateAction({ id, data })).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        router.push('/channels')
        form.reset()
        handleDrawer(null)
      } else {
        // console.log('============API_ERROR===============')
        // console.log(payload)
        // console.log('====================================')
      }
    })
  }

  const updateIntroVideoByChannelId = async (id: string, data: any) => {
    dispatch(updateAction({ id, data })).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        dispatch(fetchOneAction(id))
        form.reset()
      } else {
        // console.log('============API_ERROR===============')
        // console.log(payload)
        // console.log('====================================')
      }
    })
  }

  const deleteChannels = async (id: string) => {
    dispatch(deleteAction(id)).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        handleModal(null)
        if (payload?.data?.tokens) {
          window.localStorage.setItem('accessToken', payload?.data?.tokens?.accessToken)
          window.localStorage.setItem('refreshToken', payload?.data?.tokens?.refreshToken)
          window.localStorage.setItem('userData', JSON.stringify(payload?.data?.existUser))
        }
      } else {
        // console.log('============API_ERROR===============')
        // console.log(payload)
        // console.log('====================================')
      }
    })
  }

  const exportChannels = async () => {
    csvDownload('categories', store.entities)
  }

  return {
    form,
    store,
    getChannels,
    getAllChannels,
    getMyChannels,
    addChannel,
    subscribeChannelsById,
    updateChannelById,
    deleteChannels,
    getChannelById,
    exportChannels,
    subscribeChannelByUserId,
    getChannelsAbout,
    updateIntroVideoByChannelId,
    status
  }
}
