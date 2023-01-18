import { NextFunction, Request, Response } from 'express'
import AppDataSource from '../../data-source'
import { Clients } from '../../entities/clients.entity'
import AppError from '../../errors/AppError'

export const verifyOwnerUserSale = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientsRepository = AppDataSource.getRepository(Clients)

  const ownerUser = await clientsRepository.findOneBy({
    user: req.user,
  })

  if (!ownerUser) {
    throw new AppError('Not found any sale!', 404)
  }

  return next()
}

export default verifyOwnerUserSale
