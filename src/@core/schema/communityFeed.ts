import * as yup from 'yup'

export default {
  add: yup.object().shape({
    content: yup.string().required()
  })
}
