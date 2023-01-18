import AppDataSource from '../../data-source'
import { Clients } from '../../entities/clients.entity'
import { IClient } from '../../interfaces/clients'

export default async function getClientsService(
  id: string
): Promise<IClient[]> {
  const clientsRepository = AppDataSource.getRepository(Clients)
  const clients = await clientsRepository.find({ where: { user: { id } } })

  return clients
}
