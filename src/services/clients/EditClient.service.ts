import AppDataSource from '../../data-source'
import { Clients } from '../../entities/clients.entity'
import { IClientUpdate, IClient } from '../../interfaces/clients'

export default async function editClientService(
  id: string,
  data: IClientUpdate
): Promise<IClient> {
  const clientsRepository = AppDataSource.getRepository(Clients)
  const client = await clientsRepository.findOneBy({ id })

  if (data.email) client.email = data.email
  if (data.name) client.name = data.name
  if (data.phone) client.phone = data.phone

  const updatedClient = await clientsRepository.save(client)

  return updatedClient
}
