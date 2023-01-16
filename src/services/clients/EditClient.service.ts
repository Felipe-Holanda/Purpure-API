import { clientsRepository } from "../../data-source";
import { IClientUpdate, IClient } from "../../interfaces/clients";

export default async function editClientService(id: string, data: IClientUpdate): Promise<IClient> {
    const client = await clientsRepository.findOneBy({ id });

    if (data.email) client.email = data.email;
    if (data.name) client.name = data.name;
    if (data.phone) client.phone = data.phone;

    const updatedClient = await clientsRepository.save(client);

    return updatedClient;
}