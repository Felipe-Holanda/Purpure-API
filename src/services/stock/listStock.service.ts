import AppDataSource from "../../data-source";
import Stock from "../../entities/stock.entity";
import { IStock } from "../../interfaces/stock.interface";
import { listStockSchema } from "../../serializers/stock.serializer";

const listStockService = async (userId: string): Promise<IStock[]> => {
  const stockRepository = AppDataSource.getRepository(Stock);

  const stockList = await stockRepository.find({
    where: {
      user: userId,
    },
  });

  const stockListValidated = await listStockSchema.validate(stockList, {
    stripUnknown: true,
  });

  return stockListValidated;
};

export default listStockService;
