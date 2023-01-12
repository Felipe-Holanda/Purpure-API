import "reflect-metadata"
import "express-async-errors"
import express from "express";
import handleError from "./errors/handleError";
import { userRoutes } from "./routes/user.routes";
import { loginRoutes } from "./routes/login.routes";

const app = express();
app.use(express.json());

app.use(handleError);

app.get("/", (req, res) => {
  console.log("helo world");

  return res.json("helo world");
});

app.use('/users', userRoutes)
app.use('/login', loginRoutes)

app.use(handleError);

export default app;
