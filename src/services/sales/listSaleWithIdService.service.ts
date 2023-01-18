import AppDataSource from '../../data-source'
import { Sales } from '../../entities/sales.entity'

export const listSaleWithIdService = async (saleId: string): Promise<Sales> => {
  const salesRepository = AppDataSource.getRepository(Sales)

  const saleFound = salesRepository.findOne({
    where: { id: saleId },
    relations: {
      clients: true
    }})

  return saleFound
}
