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
import { VideoService } from 'src/services'
import { csvDownload } from 'src/@core/helper/csv-export'

// ** Actions Imports
import { fetchOneAction, fetchAllAction, updateAction, addAction, deleteAction } from 'src/store/apps/video'

import schema from 'src/@core/schema/video'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

const defaultValues = {
  name: ''
}

export const useVideo = (serviceId: string | null) => {
  // ** Hook
  const { handleDrawer, handleModal } = useToggleDrawer()
  const store = useSelector((state: RootState) => state.video)
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
    if (store.entity && serviceId) {
      form.setValue('name', store.entity?.name)
    } else {
      form.setValue('name', '')
    }
  }, [store.entity, serviceId])

  const getVideo = async (id: string) => {
    dispatch(fetchOneAction(id))
  }

  const getVideos = async ({ query }: ApiParams) => {
    dispatch(fetchAllAction({ query }))
  }

  const addVideos = async (data: any) => {
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

  const updateVideo = async (id: string, data: any) => {
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

  const deleteVideo = async (id: string) => {
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

  const exportVideos = async () => {
    csvDownload('videos', store.entities)
  }

  return {
    form,
    store,
    getVideo,
    getVideos,
    addVideos,
    updateVideo,
    deleteVideo,
    exportVideos
  }
}
