import { Router } from 'express'
import {
  listSalesController,
  listSaleWithIdController,
} from '../controllers/sales.controller'

const salesRoutes = Router()

salesRoutes.get('', listSalesController)
salesRoutes.get('/:id', listSaleWithIdController)
