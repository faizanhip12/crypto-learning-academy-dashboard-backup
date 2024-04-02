import { useEffect, useMemo } from 'react'

// ** Third Party Imports
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// import csvDownload from 'json-to-csv-export'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** import custom hooks
import useAsync from 'src/@core/hooks/useAsync'
import { RootState, AppDispatch } from 'src/store'

import { ApiParams } from 'src/types/api'

// ** import API services
import { StudentService } from 'src/services'
import { csvDownload } from 'src/@core/helper/csv-export'

// ** Actions Imports
import { fetchOneAction, fetchAllAction, updateAction, addAction, deleteAction } from 'src/store/apps/students'

import schema from 'src/@core/schema/students'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
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
    resolver: yupResolver(schema.add)
  })

  useEffect(() => {
    serviceId && dispatch(fetchOneAction(serviceId))
  }, [serviceId])

  useMemo(() => {
    if (serviceId && store?.entity) {
      form.setValue('first_name', store.entity?.first_name)
      form.setValue('last_name', store.entity?.last_name)
      form.setValue('email', store.entity?.email)
      form.setValue('phone', store.entity?.phone)
      form.setValue('gender', store.entity?.gender)
    } else {
      // form.setValue('first_name', 'last_name', 'email')
    }
  }, [store.entity, serviceId])

  const getStudent = async (id: string) => {
    dispatch(fetchOneAction(id))
  }

  const getStudents = async ({ query }: ApiParams) => {
    dispatch(fetchAllAction({ query }))
  }

  const addStudent = async (data: any) => {
    dispatch(addAction({ ...data })).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        form.reset()
        handleDrawer(null)
      } else {
        // console.log('============API_ERROR===============');
        // console.log(payload);
        // console.log('====================================');
      }
    })
  }

  const updateStudent = async (id: string, data: any) => {
    dispatch(updateAction({ id, data })).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        form.reset()
        handleDrawer(null)
      } else {
        // console.log('============API_ERROR===============');
        // console.log(payload);
        // console.log('====================================');
      }
    })
  }

  const deleteStudent = async (id: string) => {
    dispatch(deleteAction(id)).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        handleModal(null)
      } else {
        // console.log('============API_ERROR===============');
        // console.log(payload);
        // console.log('====================================');
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
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    exportStudents
  }
}
