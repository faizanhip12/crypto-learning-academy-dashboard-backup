
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
    addProject: yup.object().shape({
        name: yup.string().required(),
        discription: yup.string().required(),
        phone: yup.string().required(),
        clientId: yup.string().required(),
        image: yup.string().required(),
        longitude: yup.string().required(),
        latitude: yup.string().required()
    })
}
