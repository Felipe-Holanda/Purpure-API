import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  console.log("helo world");

  return res.json("helo world");
});

export default app;
