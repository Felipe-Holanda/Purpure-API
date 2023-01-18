import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/AppError";

const verifyUpdateBodyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const keys = Object.keys(req.body);

  keys.forEach((e) => {
    if (e !== "name" && e !== "stock" && e !== "amount") {
      throw new AppError(`Unable to update ${e}`, 401);
    }
  });

  return next();
};

export default verifyUpdateBodyMiddleware;
