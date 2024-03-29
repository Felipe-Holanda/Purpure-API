import AppDataSource from "../../data-source"
import { User } from "../../entities/users.entity"
import { IUser, IUserUpdate } from "../../interfaces/users"
import { userWithoutPasswordSerializer } from "../../serializers/users.serializer"


export const updateUserService = async ({ email, password }: IUserUpdate, userId: string): Promise<IUser> => {

    const userRepository = AppDataSource.getRepository(User)

    const findUser = await userRepository.findOneBy({
        id: userId
    })

    const updatedUser = userRepository.create({
        ...findUser,
        email,
        password
    })

    await userRepository.save(updatedUser)

    const userWithoutPassword = await userWithoutPasswordSerializer.validate(updatedUser, {
        stripUnknown: true
    })

    return userWithoutPassword
}