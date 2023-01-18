import { Request, Response, NextFunction } from "express";
import { clientsRepository } from "../../data-source";
import { IsNull } from "typeorm";
import AppError from "../../errors/AppError";

export default async function checkActivedMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { id } = req.params as { id: string };

    const client = await clientsRepository.findOne({ where: { id } });

    if (!client) throw new AppError("Client not found", 404);

    if (client.isActive === false) throw new AppError("Client not found", 400);

    return next()

}