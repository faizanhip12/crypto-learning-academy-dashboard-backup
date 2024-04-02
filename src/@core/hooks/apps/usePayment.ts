import { useEffect, useMemo } from 'react'

// ** Third Party Imports
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** import custom hooks
import useAsync from 'src/@core/hooks/useAsync'
import { RootState, AppDispatch } from 'src/store'
import { paymentSchema } from 'src/@core/schema'

import { ApiParams } from 'src/types/api'

// ** import API services
import { csvDownload } from 'src/@core/helper/csv-export'

// ** Actions Imports
import { addAction, fetchAllAction, fetchOneAction, deleteAction, updateAction } from 'src/store/apps/payment'

const defaultValues = {
  first_name: ''
}

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

export const usePayment = (serviceId: string | null) => {
  // ** Hook
  const { handleDrawer, handleModal } = useToggleDrawer()
  const store = useSelector((state: RootState) => state.payment)
  // console.log(store,"---------");

  const dispatch = useDispatch<AppDispatch>()
  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(paymentSchema.add)
  })

  useEffect(() => {
    serviceId && dispatch(fetchOneAction(serviceId))
  }, [serviceId])
  useMemo(() => {
    if (store.entity && serviceId) {
      'first_name' in store.entity && form.setValue('first_name', store.entity.first_name)
      // 'last_name' in store.entity && form.setValue('last_name', store.entity.last_name)
      // 'email' in store.entity && form.setValue('email', store.entity.email)
      // // 'password' in store.entity && form.setValue('password', store.entity.password)
      // 'phone' in store.entity && form.setValue('phone', store.entity.phone)
      // 'gender' in store.entity && form.setValue('gender', store.entity.gender)
      // 'role' in store.entity && form.setValue('role', store.entity.role)
    } else {
      form.reset()
    }
  }, [store.entity, serviceId])

  const getPayment = async (id: string) => {
    dispatch(fetchOneAction(id))
  }

  const getAllPayments = async ({ query }: ApiParams) => {
    dispatch(fetchAllAction({ query }))
  }

  const addPayment = async (data: any) => {
    dispatch(addAction({ ...data })).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        handleDrawer(null)
      } else {
        // console.log('============API_ERROR===============')
        // console.log(payload)
        // console.log('====================================')
      }
    })
  }

  const updatePayment = async (id: string, data: any) => {
    dispatch(updateAction({ id, data })).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        handleDrawer(null)
      } else {
        // console.log('============API_ERROR===============')
        // console.log(payload)
        // console.log('====================================')
      }
    })
  }

  const deletePayment = async (id: string) => {
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

  const exportPayments = async () => {
    csvDownload('payment', store.entities)
  }

  return {
    form,
    store,
    getPayment,
    getAllPayments,
    addPayment,
    updatePayment,
    deletePayment,
    exportPayments
  }
}
