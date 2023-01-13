import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import Stock from "../../entities/stock.entity";
import AppError from "../../errors/AppError";

const verifyStockAlreadyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const stockRepository = AppDataSource.getRepository(Stock);

  const stock = await stockRepository.findOneBy({
    id: Number(req.params.id),
  });

  if (stock) {
    throw new AppError("Stock already exists", 209);
  }

  return next();
};

export default verifyStockAlreadyExistsMiddleware;
