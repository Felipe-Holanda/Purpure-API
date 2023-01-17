import { NextFunction, Request, Response } from "express"
import AppDataSource from "../../data-source"
import AppError from "../../errors/AppError"
import { compare } from 'bcryptjs'
import { User } from "../../entities/users.entity"



const userPasswordIsValid = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const usersRepository = AppDataSource.getRepository(User)

    const user = await usersRepository.findOneBy({
        email: req.body.email
    })

    const passwordMatch = await compare(req.body.password, user.password)

    if (!passwordMatch) {
        throw new AppError("User or password invalid!", 403)
    }

    return next()
}

export default userPasswordIsValid