import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";

export const verifyOwnerMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const userId = req.user.id as string
    const id = req.params.id as string

    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({
        id: id
    }) as User

    if (!user) {
        throw new AppError("User not found", 404)
    }

    if (userId !== user.id) {
        throw new AppError("Insufficient permission", 403)
    }

    return next()
}
