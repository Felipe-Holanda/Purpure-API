import { Router } from "express";
import { createUserController, deleteUserController, listUsersController, updateUserController } from "../controllers/users.controller";
import { ensureAuthMiddleware } from "../middlewares/login/ensureAuth.middleware";
import { verifyCnpjAlreadyRegistredMiddleware } from "../middlewares/users/verifyCnpjAlreadyRegistred.middleware";
import { verifyEmailAlreadyRegistredMiddleware } from "../middlewares/users/verifyEmailAlreadyRegistred.middleware";
import { verifyOwnerMiddleware } from "../middlewares/users/verifyOwner.middleware";
import { verifyUpdateFieldsMiddleware } from "../middlewares/users/verifyUpdateFields.middleware";
import { verifyUserExistMiddleware } from "../middlewares/users/verifyUserExist.middleware";

export const userRoutes = Router()

userRoutes.get('', ensureAuthMiddleware, listUsersController)

userRoutes.post('', verifyEmailAlreadyRegistredMiddleware, verifyCnpjAlreadyRegistredMiddleware, createUserController)
userRoutes.patch('/:id', ensureAuthMiddleware, verifyUpdateFieldsMiddleware, verifyOwnerMiddleware, verifyUserExistMiddleware, updateUserController)


userRoutes.delete('/:id', ensureAuthMiddleware, verifyOwnerMiddleware,verifyUserExistMiddleware, deleteUserController)