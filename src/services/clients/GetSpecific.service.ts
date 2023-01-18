import AppDataSource from '../../data-source'
import { Clients } from '../../entities/clients.entity'
import { IClient } from '../../interfaces/clients'

export default async function getSpecificService(id: string): Promise<IClient> {
  const clientsRepository = AppDataSource.getRepository(Clients)
  const client = await clientsRepository.findOneBy({ id })
  return client
}
