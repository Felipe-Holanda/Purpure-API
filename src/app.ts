import "express-async-errors";
import express from "express";
import handleError from "./errors/handleError";

const app = express();
app.use(express.json());

app.use(handleError);

app.get("/", (req, res) => {
  console.log("helo world");

  return res.json("helo world");
});

export default app;
