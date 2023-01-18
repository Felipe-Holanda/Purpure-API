import { Request, Response, NextFunction } from 'express'
import AppDataSource from '../../data-source'
import AppError from '../../errors/AppError'
import { Clients } from '../../entities/clients.entity'

export default async function checkActivedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const clientsRepository = AppDataSource.getRepository(Clients)

  const { id } = req.params as { id: string }

  const client = await clientsRepository.findOne({ where: { id } })

  if (!client) throw new AppError('Client not found', 404)

  if (client.isActive === false) throw new AppError('Client not found', 400)

  return next()
}
