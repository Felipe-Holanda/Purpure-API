import AppDataSource from '../../data-source'
import { Sales } from '../../entities/sales.entity'
import { ISales, ISalesReturn } from '../../interfaces/sales.interfaces'
// import {Clients} from '../../entities/clients.entity'

export const createSaleService = async (body): Promise<Sales[]> => {
  const salesRepository = AppDataSource.getRepository(Sales)

  // const clientsRespository = AppDataSource.getRepository(Clients)

  // const foundClient = clientsRespository.findOneBy({ id: body.id })

  const createdSale = salesRepository.create(body)
  await salesRepository.save(createdSale)

  // const returnedSale = {
  //   id: body.id,
  //   client_name: foundClient.name,
  //   amount: body.amount,
  //   value: body.value,
  //   createdAt: body.createdAt,
  // }

  // const reuturnedSale = {
  //   ...body,
  //   clientId: undefined,
  //   client_name: foundClient.name,
  // }

  return createdSale
}
