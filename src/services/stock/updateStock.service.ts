import AppDataSource from "../../data-source";
import Stock from "../../entities/stock.entity";
import { IStock, IStockUpdate } from "../../interfaces/stock.interface";
import { stockSchema } from "../../serializers/stock.serializer";

const updateStockService = async (
  data: IStockUpdate,
  stockId: number
): Promise<IStock> => {
  const stockRepository = AppDataSource.getRepository(Stock);

  const stock = await stockRepository.findOneBy({
    id: stockId,
  });

  const newStock = stockRepository.create({
    ...stock,
    ...data,
  });
  await stockRepository.save(newStock);

  const stockValidated = await stockSchema.validate(newStock, {
    stripUnknown: true,
  });

  return stockValidated;
};

export default updateStockService;
