import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/store'
import { feedbackSchema } from 'src/@core/schema'
import { fetchAllAction, fetchAllByCustomerAction, addAction } from 'src/store/apps/feedback'
import { IFeedback } from 'src/types/apps/feedback'

const defaultValues: IFeedback = {
  title: '',
  content: '',
  feedbackType: ''
}

export const useFeedbacks = () => {
  // Hooks

  const store = useSelector((state: RootState) => state.feedbacks)

  const dispatch = useDispatch<AppDispatch>()

  const form = useForm({
    defaultValues,
    resolver: yupResolver(feedbackSchema.add)
  })

  const getFeedbacks = async () => {
    dispatch(fetchAllAction({}))
  }

  const getFeedbackByCustomer = async () => {
    dispatch(fetchAllByCustomerAction({}))
  }

  const addFeedback = async (data: IFeedback) => {
    const { payload } = await dispatch(addAction({ ...data }))
    if (payload?.statusCode === '10000') {
      form.reset()
      return payload
    }
  }

  return {
    form,
    store,
    getFeedbacks,
    getFeedbackByCustomer,
    addFeedback
  }
}
