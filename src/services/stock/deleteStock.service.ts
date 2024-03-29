import AppDataSource from '../../data-source'
import { Stock } from '../../entities/stock.entity'

const deleteStockService = async (stockId: number): Promise<void> => {
  const stockRepository = AppDataSource.getRepository(Stock)

  const stock = await stockRepository.findOneBy({
    id: stockId,
  })
  await stockRepository.softRemove(stock)

  return
}

export default deleteStockService
