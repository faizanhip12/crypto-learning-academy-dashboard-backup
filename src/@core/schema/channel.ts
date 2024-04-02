import * as yup from 'yup'

export default {
  add: yup.object().shape({
    name: yup.string().required(),
    slug: yup.string().required(),
    about: yup.string().required(),
    thumnail_url: yup.string().required('Thumbnail Is Required')
  })
}
