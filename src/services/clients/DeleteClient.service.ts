import AppDataSource from '../../data-source'
import { Clients } from '../../entities/clients.entity'

export default async function deleteClientService(id: string): Promise<void> {
  const clientsRepository = AppDataSource.getRepository(Clients)
  const client = await clientsRepository.findOne({ where: { id } })

  client.isActive = false
  await clientsRepository.softRemove(client)

  await clientsRepository.save(client)

  return
}
