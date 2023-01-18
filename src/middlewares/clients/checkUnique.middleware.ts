import { clientsRepository } from "../../data-source";
import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/AppError";

export default async function checkUniqueMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, phone, name } = req.body as { email: string, phone: string, name: string };

    const clientEmail = await clientsRepository.find({ where: { email } });
    const clientPhone = await clientsRepository.find({ where: { phone } });
    const clientName = await clientsRepository.find({ where: { name } });
    
    if (clientEmail.length > 0) throw new AppError("Email already in use", 400);
    if (clientPhone.length > 0) throw new AppError("Phone already in use", 400);
    if (clientName.length > 0) throw new AppError("Name already in use", 400);

    return next();
}
