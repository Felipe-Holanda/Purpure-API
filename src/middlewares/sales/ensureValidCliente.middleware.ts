import { NextFunction, Request, Response } from 'express'
import AppDataSource from '../../data-source'
import { Clients } from '../../entities/clients.entity'
import AppError from '../../errors/AppError'

export const verifyClientId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientsRepository = AppDataSource.getRepository(Clients)

  const foundClient = await clientsRepository.findOneBy({
    id: req.body.clients,
  })

  if (!foundClient) {
    throw new AppError('client does not exists!', 404)
  }

  return next()
}

export default verifyClientId
