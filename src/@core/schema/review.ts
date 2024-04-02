import * as yup from 'yup'

export default {
  add: yup.object().shape({
    description: yup.string().required()
  })
}
