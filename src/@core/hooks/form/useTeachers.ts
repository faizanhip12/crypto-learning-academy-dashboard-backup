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
import { TeacherService } from 'src/services'
import { csvDownload } from 'src/@core/helper/csv-export'

// ** Actions Imports
import {
  addAction,
  deleteAction,
  fetchAllAction,
  fetchOneAction,
  updateAction
  //   fetchEmployeeAction,
  //   fetchEmployeesAction,
  //   deleteEmployeeAction,
  //   addEmployeeAction,
  //   updateEmployeeAction
} from 'src/store/apps/teacher'

import schema from 'src/@core/schema/teacher'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

const defaultValues = {
  name: ''
  //   first_name: '',
  //   last_name: '',
  //   email: '',
  //   password: '',
  //   confirm_password: '',
  //   gender: 'MALE',
  //   phone: '',
  //   batchId: '',
  //   image: '',
  //   role: 'ADMIN'
}

export const useTeacher = (serviceId: string | null) => {
  // ** Hook
  const { handleDrawer, handleModal } = useToggleDrawer()
  const store = useSelector((state: RootState) => state.teacher)
  const dispatch = useDispatch<AppDispatch>()
  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema.add)
    // resolver: serviceId ? yupResolver(schema.updateEmployee) : yupResolver(schema.addEmployee),
    // resolver: yupResolver(serviceId ? schema.updateEmployee : schema.addEmployee)
  })

  useEffect(() => {
    serviceId && dispatch(fetchOneAction(serviceId))
  }, [serviceId])

  useMemo(() => {
    if (store.entity && serviceId) {
      form.setValue('name', store.entity?.name)
    } else {
      form.setValue('name', '')
    }
  }, [store.entity, serviceId])

  const getTeacher = async (id: string) => {
    dispatch(fetchOneAction(id))
  }

  const getAllTeachers = async ({ query }: ApiParams) => {
    dispatch(fetchAllAction({ query }))
  }

  const addTeacher = async (data: any) => {
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

  const updateTeacher = async (id: string, data: any) => {
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

  const deleteTeacher = async (id: string) => {
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

  const exportTeachers = async () => {
    csvDownload('teachers', store.entities)
  }

  return {
    form,
    store,
    getTeacher,
    getAllTeachers,
    addAction,
    updateAction,
    deleteAction,
    exportTeachers
  }
}
