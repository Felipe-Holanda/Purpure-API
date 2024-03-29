import { NextFunction, Request, Response } from "express"
import AppDataSource from "../../data-source"
import { User } from "../../entities/users.entity"
import AppError from "../../errors/AppError"


export const verifyUserExistMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const userRegistred = AppDataSource.getRepository(User)

    const user = await userRegistred.findOneBy({
        id: req.params.id
    }) as User


    if (!user) {

        throw new AppError('User not found', 404)
    }


    return next()
}