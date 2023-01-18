import AppDataSource from '../../data-source'
import { Clients } from '../../entities/clients.entity'
import { Sales } from '../../entities/sales.entity'

export const listSalesService = async (id: string) => {
  const salesRepository = AppDataSource.getRepository(Sales)
  const clientsRepository = AppDataSource.getRepository(Clients)

  const ownerUser = await clientsRepository
    .createQueryBuilder('clients')
    .innerJoinAndSelect('clients.sales', 'sales')
    .where('clients.user = :id', { id: id })
    .getMany()

  return ownerUser
}
