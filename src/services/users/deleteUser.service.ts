import AppDataSource from "../../data-source"
import { User } from "../../entities/users.entity"
import AppError from "../../errors/AppError"


export const deleteUserService = async (id: string) => {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.softRemove({
        id: id
    })

    if(!user.isActive) {
        
        throw new AppError('User is not active', 400)

    }
}