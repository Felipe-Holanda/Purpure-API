import { Request, Response, NextFunction } from 'express';
import AppError from '../../errors/AppError'

export default function checkKeysMiddleware(req: Request, res: Response, next: NextFunction): void {
    const [keys, values] = [Object.keys(req.body), Object.values(req.body)] as [string[], string[]]

    if (keys.length === 0) throw new AppError('You need to update at least one field.', 400)
    if (keys.indexOf('document') < 0) throw new AppError('You cand update user document`s.', 400)
    if (values.indexOf('') >= 0) throw new AppError('You cannot update a field to a empty value.', 400)

    return next()
}