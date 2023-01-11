import { Router } from 'express'
import { listSalesController } from '../controllers/sales.controller'

const salesRoutes = Router()

salesRoutes.get('', listSalesController)
