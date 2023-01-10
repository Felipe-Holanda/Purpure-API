import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";



export const ensureCnpjAlreadyRegistredMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const companyRegistred = AppDataSource.getRepository(User)

    const company = await companyRegistred.findBy({
        email: req.body.cnpj
    })
    
    if(company.length > 0) {
        
        throw new AppError('Company already registred', 409)
    }

    next()
}