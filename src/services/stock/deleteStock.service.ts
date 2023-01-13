import AppDataSource from "../../data-source";
import Stock from "../../entities/stock.entity";

const deleteStockService = async (stockId: number): Promise<object> => {
  const stockRepository = AppDataSource.getRepository(Stock);

  const stock = await stockRepository.findOneBy({
    id: stockId,
  });

  stockRepository.softRemove(stock);

  return {};
};

export default deleteStockService;