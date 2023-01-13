import { Router } from "express";
import userLoginController from "../controllers/userLogin.controller";
import userExist from "../middlewares/login/userExist.midleware";
import userIsActive from "../middlewares/login/userIsActive.midleware";
import userPasswordIsValid from "../middlewares/login/userPasswordIsValid.middlewares";



export const loginRoutes = Router()


loginRoutes.post('', userIsActive, userExist, userPasswordIsValid, userLoginController)