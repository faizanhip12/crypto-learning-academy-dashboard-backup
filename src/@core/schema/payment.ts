import * as yup from 'yup'

export default {
  add: yup.object().shape({
    first_name: yup.string().required()
  })
}
