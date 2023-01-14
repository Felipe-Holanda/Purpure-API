import * as yup from 'yup';

export const UpdateClientsShape = yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
    phone: yup.string().length(11)
})

export const CreateClientsShape = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().length(11).required(),
    document: yup.string().required()
})