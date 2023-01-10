import { Router } from "express";
import { createUserController, deleteUserController, listUsersController, updateUserController } from "../controllers/users.controller";
import { ensureCnpjAlreadyRegistredMiddleware } from "../middlewares/users/ensureCnpjAlreadyRegistred.middleware";
import { ensureUsernotExistMiddleware } from "../middlewares/users/ensureUserNotExist.middleware";

export const userRoutes = Router()

userRoutes.get('', listUsersController)
userRoutes.post('', ensureCnpjAlreadyRegistredMiddleware, createUserController)
userRoutes.patch('/:id', ensureUsernotExistMiddleware, updateUserController)
userRoutes.delete('/:id', ensureUsernotExistMiddleware, deleteUserController)