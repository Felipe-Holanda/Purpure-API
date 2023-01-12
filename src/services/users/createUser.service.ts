import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { IUser, IUserRequest } from "../../interfaces/users";
import { userWithoutPasswordSerializer } from "../../serializers/users.serializer";

export const createUserService = async (userData: IUserRequest): Promise<IUser> => {
    const userRepository = AppDataSource.getRepository(User)

    const createUser = userRepository.create(userData)

    await userRepository.save(createUser)

    const userWithoutPassword = await userWithoutPasswordSerializer.validate(createUser, {
        stripUnknown: true
    })

    return userWithoutPassword
}