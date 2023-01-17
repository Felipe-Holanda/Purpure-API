import { Request, Response, NextFunction } from 'express';
import { userRepository, clientsRepository } from '../../data-source';
import AppError from '../../errors/AppError';

export default async function checkMatchMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params as { id: string };
    const userId = req.user.id as string;
    const user = await userRepository.findOneBy({ id: userId });
    const client = await clientsRepository.findOne({ where: { id }, relations: ['user'] });
 
    if (!client) throw new AppError("Client not found", 404);
    if (client.isActive === false) throw new AppError("Client is inactive", 400);
    if (user.id !== client.user.id) throw new AppError("Client not found", 404);
    
    return next();
}