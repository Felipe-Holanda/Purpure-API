import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";


export const listUsersServices = async (userId): Promise<User> => {

    const userRepository = AppDataSource.getRepository(User)
    
    const users = await userRepository.findOneBy({
        id: userId
    })

    return users
}