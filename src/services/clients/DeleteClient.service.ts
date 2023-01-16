import { clientsRepository } from "../../data-source";

export default async function deleteClientService(id: string): Promise<void> {
    const client = await clientsRepository.findOne({ where: { id } });

    client.isActive = false;
    clientsRepository.softRemove(client);

    clientsRepository.save(client);

    return;
}