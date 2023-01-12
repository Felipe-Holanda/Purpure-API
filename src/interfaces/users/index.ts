export interface IUserRequest {
    comercialName: string
    cnpj: string
    password: string
    email: string
}

export interface IUser {
    id: string
    comercialName: string
    cnpj: string
    email: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

export interface IUserUpdate {
    // comercialName?: string
    email?: string
    password?: string
}