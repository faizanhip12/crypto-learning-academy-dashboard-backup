
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
    addEmployee: yup.object().shape({
        first_name: yup.string().required(),
        last_name: yup.string().required(),
        email: yup.string().email().required(),
        phone: yup.string().required(),
        batchId: yup.string().required(),
        password: yup.string(),
        confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
        // password: yup.string().min(8, obj => showErrors('password', obj.value.length, obj.min)),
        image: yup.string().required(),
    }),
    updateEmployee: yup.object().shape({
        first_name: yup.string().required(),
        last_name: yup.string().required(),
        email: yup.string().email().required(),
        phone: yup.string().required(),
        batchId: yup.string().required(),
        password: yup.string().min(8, obj => showErrors('password', obj.value.length, obj.min)),
        confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
        image: yup.string().required(),
    })
}
