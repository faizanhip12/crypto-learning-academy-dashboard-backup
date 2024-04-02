import * as yup from 'yup'

export default {
  add: yup.object().shape({
    value: yup.string().required()
  })
}
