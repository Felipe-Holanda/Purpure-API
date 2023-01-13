import { Router } from 'express'
import {
  listSalesController,
  listSaleWithIdController,
} from '../controllers/sales.controller'

export const salesRoutes = Router()

salesRoutes.get('', listSalesController)
salesRoutes.get('/:id', listSaleWithIdController)
