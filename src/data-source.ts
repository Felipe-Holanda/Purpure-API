import "reflect-metadata";
import "dotenv/config";
import path from "path";
import { DataSource } from "typeorm";
import { User } from "./entities/users.entity";
import { Clients } from "./entities/clients.entity";


const AppDataSource =
  process.env.NODE_ENV === "test"
    ? new DataSource({
      type: "sqlite",
      database: ":memory:",
      entities: [path.join(__dirname, "./entities/**.{js,ts}")],
      synchronize: true,
    })
    :
    new DataSource({
      type: "postgres",
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      port: parseInt(process.env.PGPORT),
      synchronize: true,
      logging: false,
      entities: [path.join(__dirname, "./entities/**.{js,ts}")],
      migrations: [path.join(__dirname, "./migrations/**.{js,ts}")],
    });

export const userRepository = AppDataSource.getRepository(User);
export const clientsRepository = AppDataSource.getRepository(Clients);

export default AppDataSource;
