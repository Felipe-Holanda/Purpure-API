import { Router } from 'express'
import {
  createSaleController,
  listSalesController,
  listSaleWithIdController,
} from '../controllers/sales.controller'
import { ensureAuthMiddleware } from '../middlewares/login/ensureAuth.middleware'
import verifySaleIdParams from '../middlewares/sales/ensureVerifySaleIdParams.middleware'


export const salesRoutes = Router()

salesRoutes.get('', ensureAuthMiddleware, listSalesController)

salesRoutes.get(
  '/:id',
  ensureAuthMiddleware,
  verifySaleIdParams,
  listSaleWithIdController
)

salesRoutes.post('', ensureAuthMiddleware, createSaleController)
