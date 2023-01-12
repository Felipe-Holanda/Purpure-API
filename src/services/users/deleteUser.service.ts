import AppDataSource from "../../data-source"
import { User } from "../../entities/users.entity"


export const deleteUserService = async (id: string) => {

    const userRepository = AppDataSource.getRepository(User)

    const inactivated = await userRepository.findOneBy({
        id: id
    })

    inactivated.isActive = false
    await userRepository.save(inactivated)

    await userRepository.softDelete({
        id: id
    })

    return {}
}