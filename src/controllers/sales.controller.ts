import { Request, Response } from 'express'
import { listSalesService } from '../services/sales/listSales.service'

export const listSalesController = async (req: Request, res: Response) => {
  const sales = await listSalesService()
  return res.status(200).json(sales)
}
