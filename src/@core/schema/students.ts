import * as yup from 'yup'

export default {
  add: yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    phone: yup.string().required('Phone Is Required'),
    gender: yup.string().required()
  })
}
