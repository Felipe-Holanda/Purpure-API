import { Request, Response } from "express";
import { createStockService } from "../services/stock/createStock.service";
import deleteStockService from "../services/stock/deleteStock.service";
import getStockByidService from "../services/stock/getStockById.service";
import listStockService from "../services/stock/listStock.service";
import updateStockService from "../services/stock/updateStock.service";

export const createStockController = async (req: Request, res: Response) => {
  const data = req.body;
  const userId = req.user.id;

  const stock = await createStockService(data, userId);

  return res.status(201).json(stock);
};

export const listStockController = async (req: Request, res: Response) => {
  const userId = req.user.id;

  const stockList = await listStockService(userId);

  return res.json(stockList);
};

export const getStockByIdController = async (req: Request, res: Response) => {
  const stockId = Number(req.params.id);

  const stock = await getStockByidService(stockId);

  return res.json(stock);
};

export const updateStockController = async (req: Request, res: Response) => {
  const data = req.body;
  const stockId = Number(req.params.id);

  const newStock = await updateStockService(data, stockId);

  return res.json(newStock);
};

export const deleteStockController = async (req: Request, res: Response) => {
  const stockId = Number(req.params.id);

  await deleteStockService(stockId);

  return res.status(204).json();
};
