// ** Third Party Imports
import * as yup from 'yup'

export default {
  add: yup.object().shape({
    first_name: yup.string().min(3).max(50, 'First Name must be at most 50 characters').required(),
    last_name: yup.string().min(3).max(50, 'Last Name must be at most 50 characters').required(),
    email: yup.string().min(5).max(50, 'Email must be at most 50 characters').email('Invalid email address').required(),
    // password: yup.string().min(5).max(25, 'Password must be at most 25 characters').required(),
    // phone: yup.string().min(10).max(20, 'Phone must be at most 20 characters').required(),
    phone: yup.string().min(10).max(20).nullable().required('Phone must be at most 20 characters'),
    gender: yup.string().required()
    // role: "TEACHER"
  })
}
