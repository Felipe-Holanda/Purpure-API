import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { IUser } from "../../interfaces/users";
import { userWithoutPasswordSerializer } from "../../serializers/users.serializer";


export const listUsersServices = async (userId: string): Promise<IUser> => {

    const userRepository = AppDataSource.getRepository(User)
    
    const users = await userRepository.findOneBy({
        id: userId
    })

    const userWithoutPassword = await userWithoutPasswordSerializer.validate(users, {
        stripUnknown: true
    })

    return userWithoutPassword
}