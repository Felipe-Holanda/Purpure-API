import AppDataSource from '../../data-source'
import { Sales } from '../../entities/sales.entity'
import { Clients } from '../../entities/clients.entity'

export const createSaleService = async (data: any) => {
  const salesRepository = AppDataSource.getRepository(Sales)
  
  const clientsRespository = AppDataSource.getRepository(Clients)
  
  const foundClient = await clientsRespository.findOneBy({ id: data.clients })
  const createdSale = salesRepository.create(data)
  
  await salesRepository.save(createdSale)
  
  const reuturnedSale = {
    ...createdSale,
    clients: undefined,
    client_name: foundClient.name,
  } 
  
  return reuturnedSale
}
