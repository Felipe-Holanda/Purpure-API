import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import 'dotenv'
import AppError from "../../errors/AppError";


export const ensureAuthMiddleware = async(req: Request, res: Response, next: NextFunction) => {

    let token = req.headers.authorization

    if(!token){
        throw new AppError('Invalid token', 401)
      }

    token = token.split(' ')[1]

    jwt.verify(token, process.env.SECRET_KEY, (error: { message: string; }, decoded: { id: string; isActive: boolean; }) => {
        if(error){
            throw new AppError(error.message, 401)
        }

        req.user = {
            id: decoded.id,
            isActive: decoded.isActive
        }

        return next()
    })


}