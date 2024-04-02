import { useEffect, useMemo, useState } from 'react'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** import custom hooks
import useAsync from 'src/@core/hooks/useAsync'
import { RootState, AppDispatch } from 'src/store'

import { ApiParams } from 'src/types/api'

// ** import API services
import { csvDownload } from 'src/@core/helper/csv-export'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { replyService } from 'src/services'
import { useComment } from './useComments'

const defaultValues = {}

export const useReplies = (serviceId: string | null) => {
  // ** Hook

  const [replies, setReplies] = useState([])

  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')

  const form = useForm({
    defaultValues,
    mode: 'onChange'
    // resolver: yupResolver(studentSchema.add)
  })

  // useEffect(() => {
  //   serviceId && dispatch(fetchOneAction(serviceId))
  // }, [serviceId])

  // useMemo(() => {
  //   if (store?.entity && serviceId) {
  //     // console.log(store.entity,"---hello")
  //   } else {
  //     form.reset()
  //   }
  // }, [store?.entity, serviceId])

  const getReply = async (id: string) => {
    // dispatch(fetchOneAction(id))
  }

  const getAllReplies = async ({ query }: ApiParams) => {
    // dispatch(fetchAllAction({ query }))
  }

  const getAllRepliesByCommentId = async (query: ApiParams) => {
    const { data } = await replyService.getById(query)
    if (data?.statusCode === '10000') {
      setReplies(data?.data)
    }
  }

  const likeReplies = async (id: any) => {
    const { data } = await replyService.likeReplies(id)
    return data
  }

  const addReply = async (body: any) => {
    setStatus('pending')
    let videoId = body.videoId
    delete body.videoId
    const { data } = await replyService.add(videoId, body)
    setStatus('success')
    return data
  }

  const updateReply = async (id: string, body: any) => {
    setStatus('pending')
    const { data } = await replyService.update(id, body)
    setStatus('success')
    return data
  }

  const deleteReply = async (id: string) => {
    const { data } = await replyService.delete(id)
    setReplies(replies?.filter((item: any) => item?.id !== id))
    return data
  }

  const exportReplies = async () => {
    // csvDownload('replies', store.entities)
  }

  return {
    form,
    getReply,
    getAllReplies,
    addReply,
    updateReply,
    deleteReply,
    exportReplies,
    getAllRepliesByCommentId,
    setReplies,
    replies,
    likeReplies,
    status
  }
}
