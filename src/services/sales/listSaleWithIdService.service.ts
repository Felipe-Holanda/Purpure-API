import AppDataSource from '../../data-source'
import { Sales } from '../../entities/sales.entity'

export const listSaleWithIdService = async (saleId: string) => {
  const salesRepository = AppDataSource.getRepository(Sales)

  const saleFound = salesRepository.findOneBy({ id: saleId })

  return saleFound
}
