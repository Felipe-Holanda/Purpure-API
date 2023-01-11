import { Router } from "express";
import {
  createStockController,
  deleteStockController,
  getStockByIdController,
  listStockController,
  updateStockController,
} from "../controllers/stock.controller";
import verifySchemaMiddleware from "../middlewares/global/verifySchema.middleware";
import verifyStockAlreadyExistsMiddleware from "../middlewares/stock/verifyStockAlreadyExists.middleware";
import verifyStockexistsMiddleware from "../middlewares/stock/verifyStockExists.middleware";
import {
  insertStockSchema,
  stockRequestEschema,
  stockUpdateSchema,
} from "../serializers/stock.serializer";

const stockRouter = Router();

//Falta a verificação de login

stockRouter.post(
  "",
  verifySchemaMiddleware(stockRequestEschema),
  verifyStockAlreadyExistsMiddleware,
  createStockController
);
stockRouter.get("", listStockController);
stockRouter.get("/:id", verifyStockexistsMiddleware, getStockByIdController);
stockRouter.patch(
  "/:id",
  verifySchemaMiddleware(stockUpdateSchema),
  verifyStockexistsMiddleware,
  updateStockController
);
stockRouter.put(
  "/:id",
  verifySchemaMiddleware(insertStockSchema),
  verifyStockexistsMiddleware,
  updateStockController
);
stockRouter.delete("/:id", verifyStockexistsMiddleware, deleteStockController);

export default stockRouter;
