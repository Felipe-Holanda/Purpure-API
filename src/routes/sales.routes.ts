import { Router } from 'express'
import {
  listSalesController,
  listSaleWithIdController,
} from '../controllers/sales.controller'
import { ensureAuthMiddleware } from '../middlewares/login/ensureAuth.middleware'
import saleExist from '../middlewares/sales/ensureAuthSaleId.middleware'
import verifyClientId from '../middlewares/sales/ensureValidCliente.middleware'
import verifySaleIdParams from '../middlewares/sales/ensureVerifySaleIdParams.middleware'
import { createSaleService } from '../services/sales/createSale.service'

export const salesRoutes = Router()

salesRoutes.get('', ensureAuthMiddleware, listSalesController)

salesRoutes.get(
  '/:id',
  ensureAuthMiddleware,
  verifySaleIdParams,
  listSaleWithIdController
)

salesRoutes.post(
  '',
  ensureAuthMiddleware,
  verifyClientId,
  saleExist,
  createSaleService
)
