import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleError from "./errors/handleError";
import stockRouter from "./routes/stock.routes";
import { salesRoutes } from './routes/sales.routes'
import { userRoutes } from "./routes/user.routes";
import { loginRoutes } from "./routes/login.routes";
import { clientsRoutes } from "./routes/clients.routes";


const app = express()
app.use(express.json())

app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/stock", stockRouter);
app.use("/sales", salesRoutes);
app.use("/clients", clientsRoutes);

app.use(handleError)

export default app
