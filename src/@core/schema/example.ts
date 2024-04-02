import * as yup from 'yup'

export default {
  add: yup.object().shape({
    name: yup.string().required()
  })
}
