import * as yup from 'yup'

export default {
  add: yup.object().shape({
    name: yup.string().required('Name is a required field'),
    description: yup.string().required('Description is a required field'),
    milestoneType: yup.string().required('Milestone Type is a required field'),
    milestoneEntity: yup.string().optional(),
    count: yup.string().required('Count is a required field'),
    bonus_points: yup.string().required('Bonus Points is a required field')
  })
}
