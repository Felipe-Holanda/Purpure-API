import { User } from "../../entities/users.entity";

export interface IClient {
    id: string;
    name: string;
    email: string;
    phone: string;
    document: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export interface IClientUpdate {
    name?: string;
    email?: string;
    phone?: string;
}

export interface IClientCreate {
    name: string;
    email: string;
    phone: string;
    document: string;
}