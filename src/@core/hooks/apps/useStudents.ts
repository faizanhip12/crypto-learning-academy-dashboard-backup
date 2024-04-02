import { useEffect, useMemo } from 'react'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** import custom hooks
import useAsync from 'src/@core/hooks/useAsync'
import { RootState, AppDispatch } from 'src/store'

import { studentSchema } from 'src/@core/schema'

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
  fetchAllActionPoints
} from 'src/store/apps/students'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

const defaultValues = {
  role: 'STUDENT',
  first_name: '',
  last_name: '',
  email: '',
  // password: '',
  phone: '',
  gender: ''
}

export const useStudents = (serviceId: string | null) => {
  // ** Hook
  const { handleDrawer, handleModal } = useToggleDrawer()
  const store = useSelector((state: RootState) => state.students)
  const dispatch = useDispatch<AppDispatch>()

  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(studentSchema.add)
  })

  useEffect(() => {
    serviceId && dispatch(fetchOneAction(serviceId))
  }, [serviceId])

  useMemo(() => {
    if (store.entity && serviceId) {
      // console.log(store.entity,"---hello")
      'first_name' in store.entity && form.setValue('first_name', store.entity.first_name)
      'last_name' in store.entity && form.setValue('last_name', store.entity.last_name)
      'email' in store.entity && form.setValue('email', store.entity.email)
      // 'password' in store.entity && form.setValue('password', store.entity.password)
      'phone' in store.entity && form.setValue('phone', store.entity.phone)
      'gender' in store.entity && form.setValue('gender', store.entity.gender)
    } else {
      form.reset()
    }
  }, [store.entity, serviceId])

  const getStudent = async (id: string) => {
    dispatch(fetchOneAction(id))
  }

  const getAllStudents = async ({ query }: ApiParams) => {
    dispatch(fetchAllAction({ query }))
  }

  const getAllStudentsPoints = async ({ query }: ApiParams) => {
    dispatch(fetchAllActionPoints({ query }))
  }

  const addStudent = async (data: any) => {
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

  const updateStudent = async (id: string, data: any) => {
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

  const deleteStudent = async (id: string) => {
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

  const exportStudents = async () => {
    csvDownload('students', store.entities)
  }

  return {
    form,
    store,
    getStudent,
    getAllStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    exportStudents,
    getAllStudentsPoints
    // student: defaultValues.name
  }
}
