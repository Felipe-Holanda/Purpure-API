import AppDataSource from '../../data-source'
import { Sales } from '../../entities/sales.entity'
import { Clients } from '../../entities/clients.entity'
import { StockSales } from '../../entities/stockSales.entity'
import { Stock } from '../../entities/stock.entity'
import { ISales, ISalesReturn } from '../../interfaces/sales/sales.interfaces'

export const createSaleService = async (
  data: ISales
): Promise<ISalesReturn> => {
  const salesRepository = AppDataSource.getRepository(Sales)

  const clientsRespository = AppDataSource.getRepository(Clients)

  const stockSalesRepository = AppDataSource.getRepository(StockSales)

  const stockRepository = AppDataSource.getRepository(Stock)

  const foundClient = await clientsRespository.findOneBy({ id: data.client })

  const foundStock = await stockRepository.findOneBy({
    id: data.stock,
  })

  const createdSale = salesRepository.create({
    amount: data.amount,
    client: foundClient,
    value: data.value,
  })
  await salesRepository.save(createdSale)

  const sale = await salesRepository.findOneBy({ id: createdSale.id })

  const stockSaleReturned = {
    sale: sale,
    stock: foundStock,
  }

  const stockSaleRegister = stockSalesRepository.create(stockSaleReturned)
  await stockSalesRepository.save(stockSaleRegister)

  const returnedSale = {
    ...createdSale,
    client: undefined,
    clientName: foundClient.name,
    stockName: foundStock.name,
  }

  return returnedSale
}
