import { Router } from 'express'
import {
  createSaleController,
  listSalesController,
  listSaleWithIdController,
} from '../controllers/sales.controller'
import verifySchemaMiddleware from '../middlewares/global/verifySchema.middleware'
import { ensureAuthMiddleware } from '../middlewares/login/ensureAuth.middleware'
import verifyClientId from '../middlewares/sales/ensureValidCliente.middleware'
import verifySaleIdParams from '../middlewares/sales/ensureVerifySaleIdParams.middleware'
import { salesRequestschema } from '../serializers/sales.serializer'

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
  verifySchemaMiddleware(salesRequestschema),
  verifyClientId,
  createSaleController
)
