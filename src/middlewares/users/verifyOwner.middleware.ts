import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";

export const verifyOwnerMiddleware = async (req:Request, res:Response, next:NextFunction) => {

    const userId = req.user.id
    const id = req.params.id

    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({
        id: id
    })

    if (!user){
        throw new AppError("User not found", 404)
    }

    if (userId !== user.id){
        throw new AppError("Insufficient permission", 403)
    }

    return next()
}
