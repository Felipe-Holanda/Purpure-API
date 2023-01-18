import { Router } from 'express'
export const clientsRoutes = Router()
import {
  CreateClientsShape,
  UpdateClientsShape,
} from '../schemas/clients.schemas'
import verifySchemaMiddleware from '../middlewares/global/verifySchema.middleware'
import { ensureAuthMiddleware } from '../middlewares/login/ensureAuth.middleware'
import checkMatchMiddleware from '../middlewares/clients/checkMatch.middleware'
import checkUniqueMiddleware from '../middlewares/clients/checkUnique.middleware'
import checkKeysMiddleware from '../middlewares/clients/checkKeys.middleware'
import checkActivedMiddleware from '../middlewares/clients/checkActived.middleware'
import {
  registerClientsController,
  getClientsController,
  getSpecificController,
  editClientController,
  deleteClientController,
} from '../controllers/clients.controller'

clientsRoutes.get('', ensureAuthMiddleware, getClientsController)
clientsRoutes.post(
  '',
  ensureAuthMiddleware,
  verifySchemaMiddleware(CreateClientsShape),
  checkUniqueMiddleware,
  registerClientsController
)
clientsRoutes.get(
  '/:id',
  ensureAuthMiddleware,
  checkActivedMiddleware,
  getSpecificController
)
clientsRoutes.patch(
  '/:id',
  ensureAuthMiddleware,
  checkMatchMiddleware,
  verifySchemaMiddleware(UpdateClientsShape),
  checkUniqueMiddleware,
  checkKeysMiddleware,
  editClientController
)
clientsRoutes.delete(
  '/:id',
  ensureAuthMiddleware,
  checkMatchMiddleware,
  deleteClientController
)
