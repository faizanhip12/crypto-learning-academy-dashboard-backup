
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
    addClient: yup.object().shape({
        client_name: yup.string().required(),
        client_email: yup.string().email().required(),
        client_phone: yup.string().required(),
        client_image: yup.string().required(),
        website: yup.string().url().required(),
        country: yup.string().required(),
        state: yup.string().required(),
        city: yup.string().required(),
        zip: yup.string().required(),
        longitude: yup.string().required(),
        latitude: yup.string().required()
    })
}
