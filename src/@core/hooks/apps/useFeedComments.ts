import { useEffect, useMemo, useState } from 'react'

// ** Third Party Imports
import toast from 'react-hot-toast'

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
import { communityFeedService } from 'src/services'
import { useForm } from 'react-hook-form'
import { ModalType } from 'src/types'

export const useFeedComments = (serviceId: string | null) => {
  // ** Hook
  const { handleDrawer, handleModal } = useToggleDrawer()
  // const store = useSelector((state: RootState) => state.user)

  const dispatch = useDispatch<AppDispatch>()
  const form = useForm()

  const [comments, setComments] = useState<any[]>([])
  const [type, setType] = useState<'ADD' | 'UPDATE'>('ADD')
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')

  useEffect(() => {
    // serviceId && dispatch(fetchOneAction(serviceId))
  }, [serviceId])

  const getComment = async (id: string) => { }

  const getAllComments = async (query: ApiParams) => {
    setStatus('pending')
    //@ts-ignore
    communityFeedService.getAllComments(query).then(({ data }: any) => {
      if (data?.statusCode === '10000') {
        setStatus('success')
        setComments(data?.data)
      } else {
        setStatus('error')
      }
    })
  }

  const addComment = async (body: any) => {
    setStatus('pending')
    const response = await communityFeedService.postComments(body)
    setStatus('success')
    setType('ADD')
    return response
  }

  const updateComment = async (id: string, body: any) => {
    setStatus('pending')
    const { data } = await communityFeedService.updateComments(id, body)
    toast.success('Updated Successfully')
    setStatus('success')
    return data
  }

  const deleteComment = async (id: string) => {
    setStatus('pending')
    const { data } = await communityFeedService.deleteComments(id)
    if (data?.statusCode === '10000') {
      // handleModal(null, ModalType.FEEDCOMMENT)
      setStatus('success')
      const updatedComments = [...comments]
      const updatedData = updatedComments?.filter((item: any) => item?.id != data?.data?.id)
      toast.success('Deleted Successfully')
      setComments(updatedData)
    } else {
      setStatus('error')
    }
  }

  const exportComment = async () => {
    // csvDownload('Comments', store.entities)
  }

  return {
    comments,
    type,
    setType,
    setComments,
    form,
    getComment,
    getAllComments,
    addComment,
    deleteComment,
    updateComment,
    status
    // exportComment,
    // likeComments
  }
}
