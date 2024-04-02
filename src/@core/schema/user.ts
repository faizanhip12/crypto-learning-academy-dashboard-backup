// ** Third Party Imports
import * as yup from 'yup'

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

export default {
  createAccount: yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email().required(),
    gender: yup.string().required(),
    password: yup
      .string()
      .min(8, obj => showErrors('password', obj.value.length, obj.min))
      .required(),
    confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
  }),
  createCompany: yup.object().shape({
    name: yup.string().required().min(3),
    email: yup.string().required().email(),
    phone: yup.string().required(),
    website: yup.string().optional(),
    longitude: yup.string().required(),
    latitude: yup.string().required(),
    country: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    zip: yup.string().required()
  }),
  profile: yup.object().shape({
    // first_name: yup.string().required().min(3).max(25)
  })
}
