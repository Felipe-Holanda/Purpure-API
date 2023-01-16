import { Request, Response } from "express";
import userLoginService from "../services/login/userLogin.service";


const userLoginController = async (req: Request, res: Response): Promise<Response> => {
    const sessionData = req.body as { email: string, password: string }
    const [status, token] = await userLoginService(sessionData) as [number, string];

    return res.status(status as number).json({ token })
}

export default userLoginController;