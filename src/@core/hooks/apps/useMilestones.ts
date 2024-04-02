import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/store'
import { milestoneSchema } from 'src/@core/schema'
import { ApiParams } from 'src/types/api'
import { fetchAllAction, fetchOneAction, addAction, updateAction, deleteAction } from 'src/store/apps/milestone'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { IMilestone } from 'src/types/apps/milestone'

const defaultValues = {
  name: '',
  description: '',
  milestoneType: '',
  milestoneEntity: '',
  count: 0,
  bonus_points: 0
}

export const useMilestone = (serviceId: string | null) => {
  const { handleDrawer, handleModal } = useToggleDrawer()
  const store = useSelector((state: RootState) => state.milestones)
  const dispatch = useDispatch<AppDispatch>()

  const form = useForm({
    defaultValues,
    resolver: yupResolver(milestoneSchema.add)
  })

  useEffect(() => {
    serviceId && dispatch(fetchOneAction(serviceId))
  }, [serviceId])

  useMemo(() => {
    if (store.entity && serviceId) {
      form.reset({
        name: store.entity.name,
        description: store.entity.description,
        milestoneType: store.entity.milestoneType,
        milestoneEntity: store.entity.milestoneEntity,
        count: store.entity.count,
        bonus_points: store.entity.bonus_points
      })
    } else {
      form.reset(defaultValues)
    }
  }, [store.entity, serviceId])

  const getMilestone = async (id: string) => {
    dispatch(fetchOneAction(id))
  }

  const getAllMilestones = async ({ query }: ApiParams) => {
    dispatch(fetchAllAction({ query }))
  }

  const addMilestone = async (data: IMilestone) => {
    dispatch(addAction({ ...data })).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        form.reset()
        handleDrawer(null)
      }
    })
  }

  const updateMilestone = async (id: string, data: IMilestone) => {
    dispatch(updateAction({ id, data })).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        form.reset()
        handleDrawer(null)
      }
    })
  }

  const deleteMilestone = async (id: string) => {
    dispatch(deleteAction(id)).then(({ payload }: any) => {
      if (payload?.statusCode === '10000') {
        handleModal(null)
      }
    })
  }

  return {
    form,
    store,
    getMilestone,
    getAllMilestones,
    addMilestone,
    updateMilestone,
    deleteMilestone
  }
}
