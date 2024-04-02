
// ** Third Party Imports
import * as yup from 'yup'

export default {
    add: yup.object().shape({
        name: yup.string().required(),
        // max_image: yup.number().required(),
        // max_video: yup.number().required(),
        // max_doc: yup.number().required(),
        // labelId: yup.string().required(),
        assignmentId: yup.string().required(),
    }),
    addVersion: yup.object().shape({
        name: yup.string().required(),
    })
}
