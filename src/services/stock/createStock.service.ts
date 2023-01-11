import AppDataSource from "../../data-source";
import Stock from "../../entities/stock.entity";
import { IStockRequest } from "../../interfaces/stock.interface";
import { stockSchema } from "../../serializers/stock.serializer";
//import User from "../../entities/user.entity"

//Falta a entidade de user

export const createStockService = async (
  data: IStockRequest,
  userId: string
) => {
  const stockRepository = AppDataSource.getRepository(Stock);
  //const userRepository = AppDataSource.getRepository(User)

  /* const user = await userRepository.findOneBy({
        id: userId
    }) */

  const newStock = stockRepository.create({
    ...data,
    //user: user
  });
  await stockRepository.save(newStock);

  const userValidated = await stockSchema.validate(newStock, {
    stripUnknown: true,
  });

  return userValidated;
};
