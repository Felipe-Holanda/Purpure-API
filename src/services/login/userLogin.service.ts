import AppDataSource from "../../data-source"
import AppError from "../../errors/AppError"
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { User } from "../../entities/users.entity"


const userLoginService = async ({ email }): Promise<[number, string]> => {
    const usersRepository = AppDataSource.getRepository(User)

    const user = await usersRepository.findOneBy({
        email: email
    })

    const token = jwt.sign(
        {
            id: user.id,
            isActive: user.isActive
        },
        String(process.env.SECRET_KEY),
        {
            subject: user.id,
            expiresIn: "24h"
        }
    )

    return [200, token]
}

export default userLoginService