import { Request, Response } from "express";
import userLoginService from "../services/login/userLogin.service";


const userLoginController = async (req: Request, res: Response) => {
    const sessionData = req.body
    const [status, token] = await userLoginService(sessionData)

    return res.status(status as number).json({ token })
}

export default userLoginController;