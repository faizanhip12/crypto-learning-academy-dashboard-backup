import { useEffect, useMemo } from 'react'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** import custom hooks
import useAsync from 'src/@core/hooks/useAsync'
import { RootState, AppDispatch } from 'src/store'

import { subscriptiontSchema } from 'src/@core/schema'

import { ApiParams } from 'src/types/api'

// ** import API services
import { csvDownload } from 'src/@core/helper/csv-export'

// ** Actions Imports
import { fetchAllAction, fetchOneAction, addAction, updateAction, deleteAction } from 'src/store/apps/subscription'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

const defaultValues = {
  title: '',
  expireYears: '',
  expireMonths: '',
  expireDays: '',
  price: '',
  // logo: '',
  actualPrice: '',
  subTitle: '',
  description: ''
}

export const useSubscription = (serviceId: string | null) => {
  // ** Hook
  const { handleDrawer, handleModal } = useToggleDrawer()
  const store = useSelector((state: RootState) => state.subscription)
  const dispatch = useDispatch<AppDispatch>()

  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(subscriptiontSchema.add)
  })

  useEffect(() => {
    serviceId && dispatch(fetchOneAction(serviceId))
  }, [serviceId])

  useMemo(() => {
    if (store.entity && serviceId) {
      // console.log(store.entity,"---hello")
      'title' in store.entity && form.setValue('title', store.entity.title)
      'expireYears' in store.entity && form.setValue('expireYears', store.entity.expireYears)
      'expireMonths' in store.entity && form.setValue('expireMonths', store.entity.expireMonths)
      'expireDays' in store.entity && form.setValue('expireDays', store.entity.expireDays)
      'price' in store.entity && form.setValue('price', store.entity.price)
      'actualPrice' in store.entity && form.setValue('actualPrice', store.entity.actualPrice)
      'subTitle' in store.entity && form.setValue('subTitle', store.entity.subTitle)
      'description' in store.entity && form.setValue('description', store.entity.description)
    } else {
      form.reset()
    }
  }, [store.entity, serviceId])

  const getSubscription = async (id: string) => {
    dispatch(fetchOneAction(id))
  }

  const getAllSubscriptions = async ({ query }: ApiParams) => {
    dispatch(fetchAllAction({ query }))
  }

  const addSubscription = async (data: any) => {
    dispatch(addAction({ ...data })).then(({ payload }: any) => {
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

  const updateSubscription = async (id: string, data: any) => {
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

  const deleteSubscription = async (id: string) => {
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

  const exportSubscriptions = async () => {
    csvDownload('students', store.entities)
  }

  return {
    form,
    store,
    getSubscription,
    getAllSubscriptions,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    exportSubscriptions
  }
}
