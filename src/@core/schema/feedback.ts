import * as yup from 'yup'

export default {
  add: yup.object().shape({
    title: yup.string().required('Title is required'),
    content: yup.string().required('Description is required'),
    feedbackType: yup.string().required('Thumbnail is required')
  })
}
