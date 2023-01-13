import { NextFunction, Request, Response } from "express"
import AppDataSource from "../../data-source"
import { User } from "../../entities/users.entity"
import AppError from "../../errors/AppError"



const userIsActive =async (req:Request, res: Response, next: NextFunction) => {
    
    const usersRepository = AppDataSource.getRepository(User)

    const user = await usersRepository.findOneBy({
        email: req.body.email 
    })

    if(!user){
        throw new AppError("The user is not active", 400)
    }

    return next()
}

export default userIsActive