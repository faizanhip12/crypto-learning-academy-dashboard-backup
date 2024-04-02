import { useEffect, useMemo, useState } from 'react'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** import custom hooks
import useAsync from 'src/@core/hooks/useAsync'
import { RootState, AppDispatch } from 'src/store'

import { communityFeedSchema } from 'src/@core/schema'

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
  fetchAllActionByUser,
  likeAction
} from 'src/store/apps/community-feed'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { communityFeedService } from 'src/services'
import { ModalType } from 'src/types'

const defaultValues = {
  content: '',
  image: ''
}

export const useCommunityFeed = (serviceId: string | null) => {
  // ** Hook
  const { handleDrawer, handleModal } = useToggleDrawer()
  const store = useSelector((state: RootState) => state.communityFeed)
  const dispatch = useDispatch<AppDispatch>()
  const [postId, setPostId] = useState<number | null>()

  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(communityFeedSchema.add)
  })

  useEffect(() => {
    serviceId && dispatch(fetchOneAction(serviceId))
  }, [serviceId])

  useMemo(() => {
    if (store?.entity && serviceId) {
      'content' in store?.entity && form.setValue('content', store?.entity?.content)
      'image' in store?.entity && form.setValue('image', store?.entity?.image)
    } else {
      form.reset()
    }
  }, [store?.entity, serviceId])

  const getCommunityFeed = async (id: string) => {
    dispatch(fetchOneAction(id))
  }

  const getCommunityFeedByUser = async (id: string) => {
    dispatch(fetchAllActionByUser(id))
  }

  const getAllCommunityFeeds = async ({ query }: ApiParams) => {
    dispatch(fetchAllAction({ query }))
  }

  const likePostById = async (id: any) => {
    setPostId(id)
    dispatch(likeAction(id)).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        form.reset()
        setPostId(null)
        // handleDrawer(null)
      } else {
        setPostId(null)
        // console.log('============API_ERROR===============')
        // console.log(payload)
        // console.log('====================================')
      }
    })
  }

  const addCommunityFeed = async (data: any) => {
    const { payload } = await dispatch(addAction({ ...data }))
    if (payload?.statusCode === '10000') {
      form.reset()
      // handleDrawer(null)
      return payload
    } else {
    }
  }

  const updateCommunityFeed = async (id: string, data: any) => {
    dispatch(updateAction({ id, data })).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        form.reset()
        handleDrawer(null)
      } else {
        // console.log('============API_ERROR===============')
        // console.log(payload)
        // console.log('====================================')
      }
    })
  }

  const deleteCommunityFeed = async (id: string) => {
    dispatch(deleteAction(id)).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        handleModal(null, ModalType.COMMUNITYFEED)
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
    getCommunityFeed,
    getAllCommunityFeeds,
    likePostById,
    addCommunityFeed,
    updateCommunityFeed,
    deleteCommunityFeed,
    exportChannels,
    getCommunityFeedByUser,
    postId
  }
}
