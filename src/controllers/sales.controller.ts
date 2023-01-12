import { Request, Response } from 'express'
import { createSaleService } from '../services/sales/createSale.service'
import { listSalesService } from '../services/sales/listSales.service'
import { listSaleWithIdService } from '../services/sales/listSaleWithIdService.service'

export const listSalesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const sales = await listSalesService()
  return res.status(200).json(sales)
}

export const listSaleWithIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const salesId = await listSaleWithIdService(req.params.id)

  return res.status(200).json(salesId)
}

export const createSaleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const sale = await createSaleService(req.body)

  return res.status(200).json(sale)
}
