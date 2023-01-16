import { clientsRepository } from "../../data-source";
import { IClient } from "../../interfaces/clients";

export default async function getSpecificService(id: string): Promise<IClient> {
    const client = await clientsRepository.findOneBy({ id });
    return client;
}