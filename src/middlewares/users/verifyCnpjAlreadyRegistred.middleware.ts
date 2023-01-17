import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";



export const verifyCnpjAlreadyRegistredMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const companyRegistred = AppDataSource.getRepository(User)

    const company = await companyRegistred.findBy({
        cnpj: req.body.cnpj
    }) as User[]

    if (company.length > 0) {

        throw new AppError('Company already registred', 409)
    }

    return next()
}