import AppDataSource from '../../data-source'
import { Sales } from '../../entities/sales.entity'
import { Clients } from '../../entities/clients.entity'
import { Product_sales } from '../../entities/product_sales.entity'
import Stock from '../../entities/stock.entity'
import { ISales } from '../../interfaces/sales.interfaces'

export const createSaleService = async (data: any) => {
  const salesRepository = AppDataSource.getRepository(Sales)

  const clientsRespository = AppDataSource.getRepository(Clients)

  const productSalesRepository = AppDataSource.getRepository(Product_sales)

  const productRepository = AppDataSource.getRepository(Stock)

  const foundClient = await clientsRespository.findOneBy({ id: data.clients })

  const foundProduct = await productRepository.findOneBy({
    id: data.product_sales,
  })

  const createdSale = salesRepository.create(data)
  await salesRepository.save(createdSale)

  console.log(data)
  console.log(createdSale)
  const test = salesRepository.findOneBy({ id: createdSale.id })

  const returnedSale = {
    ...createdSale,
    clients: undefined,
    client_name: foundClient.name,
    product_name: foundProduct.name,
    product_id: foundProduct.id,
  }

  const teste = {
    sales: createdSale,
    products: foundProduct,
  }

  const teste2 = productSalesRepository.create(teste)
  await productSalesRepository.save(teste2)

  return returnedSale
}
