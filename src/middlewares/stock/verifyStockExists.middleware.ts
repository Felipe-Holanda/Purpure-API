import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import Stock from "../../entities/stock.entity";
import AppError from "../../errors/AppError";

const verifyStockexistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const stockRepository = AppDataSource.getRepository(Stock);

  const stock = await stockRepository.findOneBy({
    id: Number(req.params.id),
  });

  if (!stock) {
    throw new AppError("Stock not found", 404);
  }

  return next();
};

export default verifyStockexistsMiddleware;
