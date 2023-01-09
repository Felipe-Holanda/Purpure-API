import AppDataSource from "./data-source";
import app from "./app";

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected.");

    app.listen(3000, () => {
      console.log(`App is running on https://localhost:3000`);
    });
  })
  .catch((err) => console.error(err));
