// ** Third Party Imports
import * as yup from 'yup'

export default {
  add: yup.object().shape({
    name: yup.string().min(3).max(50, 'Name must be at most 50 characters').required(),
    description: yup.string().min(3).max(250, 'Description must be at most 250 characters').required(),
    thumbnail: yup.string().required('Thumbnail Is Required')
  })
}
