import AppDataSource from "../../data-source";
import Stock from "../../entities/stock.entity";
import { IStock } from "../../interfaces/stock.interface";
import { stockSchema } from "../../serializers/stock.serializer";

const getStockByidService = async (stockId: number): Promise<IStock> => {
  const stockRepository = AppDataSource.getRepository(Stock);

  const stock = await stockRepository.findOneBy({
    id: stockId,
  });

  const stockValidated = await stockSchema.validate(stock, {
    stripUnknown: true,
  });

  return stockValidated;
};

export default getStockByidService;
