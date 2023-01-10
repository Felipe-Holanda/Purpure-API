import AppDataSource from "../../data-source"
import AppError from "../../errors/AppError"
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'


const userLoginService =async ({email, password}) => {
    const usersRepository = AppDataSource.getRepository(User)

    const user = await usersRepository.findOneBy({
        email: email 
    })

    if(!user){
        throw new AppError("User or password invalid!", 403)
    }
    
    if(user.isActive === false){
        throw new AppError("The user is not active", 400)
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
        throw new AppError("User or password invalid!", 403)
    }

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