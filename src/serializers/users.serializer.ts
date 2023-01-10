import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IUser, IUserRequest, IUserUpdate } from '../interfaces/users'

export const userSerializer: SchemaOf<IUserRequest> = yup.object().shape({
    comercialName: yup.string().required(),
    cnpj: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
})

export const updateUserSerializer: SchemaOf<IUserUpdate> = yup.object().shape({
    comercialName: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    password: yup.string().notRequired()
})

export const userWithoutPasswordSerializer: SchemaOf<IUser> = yup.object().shape({
    id: yup.string().notRequired(),
    comercialName: yup.string().notRequired(),
    cnpj: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    isActive: yup.boolean().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired()
})