// ** Third Party Imports
import * as yup from 'yup'

export default {
  add: yup.object().shape({
    title: yup.string().required(),
    expireYears: yup.string().required(),
    expireMonths: yup.string().required(),
    expireDays: yup.string().required(),
    price: yup.string().required(),
    // logo: yup.string().required(),
    actualPrice: yup.string().required(),
    subTitle: yup.string().required(),
    description: yup.string().required()
  })
}
