import { clientsRepository } from "../../data-source";
import { IClient } from "../../interfaces/clients";

export default async function getClientsService(id: string): Promise<IClient[]> {
    const clients = await clientsRepository.find({ where: { user: { id } } });

    return clients;
}
