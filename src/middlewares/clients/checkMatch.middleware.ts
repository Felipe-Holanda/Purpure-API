import { Request, Response, NextFunction } from 'express'
import { Clients } from '../../entities/clients.entity'
import AppError from '../../errors/AppError'
import AppDataSource from '../../data-source'
import { User } from '../../entities/users.entity'

export default async function checkMatchMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const clientsRepository = AppDataSource.getRepository(Clients)
  const userRepository = AppDataSource.getRepository(User)

  const { id } = req.params as { id: string }
  const userId = req.user.id as string
  const user = await userRepository.findOneBy({ id: userId })
  const client = await clientsRepository.findOne({
    where: { id },
    relations: ['user'],
  })

  if (!client) throw new AppError('Client not found', 404)
  if (client.isActive === false) throw new AppError('Client is inactive', 400)
  if (user.id !== client.user.id) throw new AppError('Client not found', 404)

  return next()
}
