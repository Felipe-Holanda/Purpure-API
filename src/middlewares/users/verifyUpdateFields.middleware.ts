import { NextFunction, Request, Response } from "express"
import AppError from "../../errors/AppError"

export const verifyUpdateFieldsMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.body

    if(user.id !== undefined || user.isActive !== undefined || user.comercialName !== undefined || user.cnpj !== undefined) {
        
        throw new AppError('Invalid field', 401)
    }

    return next()
}