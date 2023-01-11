import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IInsertStock,
  IStock,
  IStockRequest,
  IStockUpdate,
} from "../interfaces/stock.interface";

export const stockRequestEschema: SchemaOf<IStockRequest> = yup.object().shape({
  name: yup.string().required(),
  stock: yup.number().required(),
  amount: yup.number().required(),
});

export const stockSchema: SchemaOf<IStock> = yup.object().shape({
  id: yup.number().notRequired(),
  name: yup.string().notRequired(),
  stock: yup.number().notRequired(),
  amount: yup.number().notRequired(),
  userid: yup.string().notRequired(),
});

export const stockUpdateSchema: SchemaOf<IStockUpdate> = yup.object().shape({
  name: yup.string().notRequired(),
  amount: yup.number().notRequired(),
});

export const insertStockSchema: SchemaOf<IInsertStock> = yup.object().shape({
  stock: yup.number().required(),
});

export const listStockSchema: SchemaOf<IStock[]> = yup.array(stockSchema);
