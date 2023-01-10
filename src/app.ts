import express from "express";
import handleError from "./errors/handleError";
import { userRoutes } from "./routes/user.routes";

const app = express();
app.use(express.json());

app.use(handleError);

app.get("/", (req, res) => {
  console.log("helo world");

  return res.json("helo world");
});

app.use('/users', userRoutes)

export default app;
