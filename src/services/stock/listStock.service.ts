import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { IStock } from "../../interfaces/stock.interface";
import { listStockSchema } from "../../serializers/stock.serializer";

const listStockService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);


  const { stock } = await userRepository
    .createQueryBuilder("users")
    .innerJoinAndSelect("users.stock", "stock")
    .where("users.id = :id", { id: userId })
    .getOne();

  const stockListValidated = await listStockSchema.validate(stock, {
    stripUnknown: true,
  });
  
  return stockListValidated
};

export default listStockService;
