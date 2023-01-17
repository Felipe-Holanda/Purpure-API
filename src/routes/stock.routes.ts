import { Router } from "express";
import {
  createStockController,
  deleteStockController,
  getStockByIdController,
  listStockController,
  updateStockController,
} from "../controllers/stock.controller";
import verifySchemaMiddleware from "../middlewares/global/verifySchema.middleware";
import { ensureAuthMiddleware } from "../middlewares/login/ensureAuth.middleware";
import verifyStockAlreadyExistsMiddleware from "../middlewares/stock/verifyStockAlreadyExists.middleware";
import verifyStockexistsMiddleware from "../middlewares/stock/verifyStockExists.middleware";
import verifyUpdateBodyMiddleware from "../middlewares/stock/verifyUpdateBody.middleware";
import {
  insertStockSchema,
  stockRequestEschema,
  stockUpdateSchema,
} from "../serializers/stock.serializer";

const stockRouter = Router();

//Falta a verificação de login

stockRouter.post(
  "",
  ensureAuthMiddleware,
  verifySchemaMiddleware(stockRequestEschema),
  verifyStockAlreadyExistsMiddleware,
  createStockController
);
stockRouter.get("", ensureAuthMiddleware, listStockController);
stockRouter.get(
  "/:id",
  ensureAuthMiddleware,
  verifyStockexistsMiddleware,
  getStockByIdController
);
stockRouter.patch(
  "/:id",
  ensureAuthMiddleware,
  verifyUpdateBodyMiddleware,
  verifySchemaMiddleware(stockUpdateSchema),
  verifyStockexistsMiddleware,
  updateStockController
);
stockRouter.put(
  "/:id",
  ensureAuthMiddleware,
  verifyUpdateBodyMiddleware,
  verifySchemaMiddleware(insertStockSchema),
  verifyStockexistsMiddleware,
  updateStockController
);
stockRouter.delete(
  "/:id",
  ensureAuthMiddleware,
  verifyStockexistsMiddleware,
  deleteStockController
);

export default stockRouter;
