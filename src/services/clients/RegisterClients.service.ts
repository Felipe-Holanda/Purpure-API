import AppDataSource from '../../data-source'
import { Clients } from '../../entities/clients.entity'
import { IClientCreate, IClient } from '../../interfaces/clients'

export default async function registerClientsService(
  id: string,
  data: IClientCreate
): Promise<IClient> {
  const clientsRepository = AppDataSource.getRepository(Clients)

  const newClient = clientsRepository.create({
    ...data,
    user: { id },
  })

  await clientsRepository.save(newClient)
  return newClient
}
