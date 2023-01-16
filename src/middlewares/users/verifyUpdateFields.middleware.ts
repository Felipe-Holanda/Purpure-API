import { NextFunction, Request, Response } from "express"
import AppError from "../../errors/AppError"

export const verifyUpdateFieldsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const user = req.body as { id?: string, isActive?: boolean, comercialName?: string, cnpj?: string }

    if (user.id !== undefined || user.isActive !== undefined || user.comercialName !== undefined || user.cnpj !== undefined) {

        throw new AppError('Invalid field', 401)
    }

    return next()
}