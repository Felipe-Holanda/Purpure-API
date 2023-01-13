import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { IStock } from "../../interfaces/stock.interface";
import { listStockSchema } from "../../serializers/stock.serializer";

const listStockService = async (userId: string): Promise<IStock[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const stockList = await userRepository
    .createQueryBuilder("users")
    .innerJoin("users.stock", "stock")
    .where("user.id = :id", { id: userId })
    .select("stock")
    .getMany();

  const stockListValidated = await listStockSchema.validate(stockList, {
    stripUnknown: true,
  });

  return stockListValidated;
};

export default listStockService;
