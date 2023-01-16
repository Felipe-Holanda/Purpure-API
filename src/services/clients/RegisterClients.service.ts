import { clientsRepository } from "../../data-source";
import { IClientCreate, IClient } from "../../interfaces/clients";

export default async function registerClientsService(id: string, data: IClientCreate): Promise<IClient> {

    const newClient = clientsRepository.create({
        ...data,
        user: { id }
    });

    await clientsRepository.save(newClient);
    return newClient;
}