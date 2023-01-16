import AppDataSource from '../../data-source'
import { Sales } from '../../entities/sales.entity'
import { Clients } from '../../entities/clients.entity'

export const createSaleService = async (body): Promise<Sales[]> => {
  const salesRepository = AppDataSource.getRepository(Sales)

  const clientsRespository = AppDataSource.getRepository(Clients)

  const foundClient = await clientsRespository.findOneBy({ id: body.id })

  const createdSale = salesRepository.create(body)
  await salesRepository.save(createdSale)

  const reuturnedSale = {
    ...body,
    clientId: undefined,
    client_name: foundClient.name,
  }

  return reuturnedSale
}
