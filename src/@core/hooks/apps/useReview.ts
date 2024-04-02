import { useEffect, useMemo } from 'react'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** import custom hooks
import useAsync from 'src/@core/hooks/useAsync'
import { RootState, AppDispatch } from 'src/store'

import { reviewSchema } from 'src/@core/schema'

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
  fetchAllActionById
} from 'src/store/apps/review'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

const defaultValues = {
  description: ''
}

export const useReview = (serviceId: string | null) => {
  // ** Hook
  const { handleDrawer, handleModal, } = useToggleDrawer()
  const store = useSelector((state: RootState) => state.review)
  const dispatch = useDispatch<AppDispatch>()

  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(reviewSchema.add)
  })

  useEffect(() => {
    serviceId && dispatch(fetchOneAction(serviceId))
  }, [serviceId])

  useMemo(() => {
    if (store.entity && serviceId) {
      // console.log(store.entity,"---hello")
      'description' in store.entity && form.setValue('description', store?.entity?.description as string)
    } else {
      form.reset()
    }
  }, [store.entity, serviceId])

  const getReview = async (id: string) => {
    dispatch(fetchOneAction(id))
  }

  const getAllReviews = async ({ query }: ApiParams) => {
    dispatch(fetchAllAction({ query }))
  }

  const getAllReviewsByPlaylistId = async (query: ApiParams) => {
    dispatch(fetchAllActionById(query))
  }

  const addReview = async (body: any) => {
    const data = await dispatch(addAction({ ...body }))
    if(data?.payload?.statusCode === '10000'){
      form.reset()
      form.setValue("description",'')
      return data
    }
  }

  const updateReview = async (id: string, data: any) => {
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

  const deleteReview = async (id: string) => {
    dispatch(deleteAction(id)).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        handleModal(null)
      } else {
        // console.log('============API_ERROR===============')
        // console.log(payload)
        // console.log('====================================')
      }
    })
  }

  const exportReviews = async () => {
    csvDownload('students', store.entities)
  }

  return {
    form,
    store,
    getReview,
    getAllReviews,
    getAllReviewsByPlaylistId,
    addReview,
    updateReview,
    deleteReview,
    exportReviews
  }
}
