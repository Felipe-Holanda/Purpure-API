import { clientsRepository } from "../../data-source";

export default async function deleteClientService(id: string): Promise<void> {
    const client = await clientsRepository.findOneBy({ id: id});
    client.isActive = false;
    clientsRepository.softRemove(client);
    
    clientsRepository.save(client);

    return ;
}