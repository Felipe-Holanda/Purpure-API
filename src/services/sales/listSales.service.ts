import AppDataSource from "../../data-source";
import { Sales } from "../../entities/sales.entity";

export const listSalesService = async (): Promise<Sales[]> => {
  const salesRepository = AppDataSource.getRepository(Sales);

  const sales = await salesRepository.find({relations: {
    clients: true
  }});

  return sales;
};
