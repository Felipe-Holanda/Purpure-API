import { NextFunction, Request, Response } from 'express'
import AppDataSource from '../../data-source'
import { Sales } from '../../entities/sales.entity'
import AppError from '../../errors/AppError'

export const saleExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const salesRepository = AppDataSource.getRepository(Sales)

  const sale = await salesRepository.findOneBy({
    id: req.body.id,
  })

  if (!sale) {
    throw new AppError('sale does not exists!', 404)
  }

  return next()
}

export default saleExist
