import { useEffect, useMemo } from 'react'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** import custom hooks
import useAsync from 'src/@core/hooks/useAsync'
import { RootState, AppDispatch } from 'src/store'

import { assignmentSchema } from 'src/@core/schema'

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
  fetchSingleStudentAssignmentAction,
  addStudentCertificate
} from 'src/store/apps/assignment'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { CertificateParams } from 'src/services/certificate.service'
import toast from 'react-hot-toast'

const defaultValues = {
  // role: 'STUDENT',
}

export const useAssignment = (serviceId: string | null) => {
  // ** Hook
  const { handleDrawer, handleModal } = useToggleDrawer()
  const store = useSelector((state: RootState) => state?.assignment)
  const dispatch = useDispatch<AppDispatch>()

  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(assignmentSchema.add)
  })

  useEffect(() => {
    serviceId && dispatch(fetchOneAction(serviceId))
  }, [serviceId])

  useMemo(() => {
    if (store.entity && serviceId) {
      // 'first_name' in store.entity && form.setValue('first_name', store.entity.first_name)
    } else {
      form.reset()
    }
  }, [store.entity, serviceId])

  const getAssignment = async (id: string) => {
    dispatch(fetchOneAction(id))
  }

  const getAllAssignments = async (query: ApiParams | any) => {
    dispatch(fetchAllAction(query))
  }

  const getSingleStudentAssignments = async (id: string, courseId: string) => {
    dispatch(fetchSingleStudentAssignmentAction({ id, courseId }))
  }

  const addCertificate = async (data: CertificateParams) => {
    const { payload } = await dispatch(addStudentCertificate({ data }))
    if (payload?.statusCode === '10000') {
      toast.success('Certificate generated successfully')
      return payload
    }
  }

  const addAssignment = async (data: any) => {
    const { payload } = await dispatch(addAction(data))
    if (payload?.statusCode === '10000') {
      return payload
    }
    // dispatch(addAction(data)).then(({ payload }: any) => {
    //   if (payload?.statusCode === '10000') {
    //     form.reset()
    //   } else {
    //     // console.log('============API_ERROR===============')
    //     // console.log(payload)
    //     // console.log('====================================')
    //   }
    // })
  }

  const updateAssignment = async (id: string, data: any) => {
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

  const deleteAssignment = async (id: string) => {
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

  const exportAssignment = async () => {
    csvDownload('Assignment', store.entities)
  }

  return {
    form,
    store,
    getAssignment,
    getAllAssignments,
    addCertificate,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    exportAssignment,
    getSingleStudentAssignments
  }
}
