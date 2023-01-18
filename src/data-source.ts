import 'reflect-metadata'
import 'dotenv/config'
import path from 'path'
import { DataSource, DataSourceOptions } from 'typeorm'

const setDataSourceConfig = (): DataSourceOptions => {
  const entities: string = path.join(__dirname, './entities/**.{js,ts}')
  const migrations: string = path.join(__dirname, './migrations/**.{js,ts}')

  const nodeEnv: string = process.env.NODE_ENV

  if (nodeEnv === 'test') {
    return {
      type: 'sqlite',
      database: ':memory:',
      entities: [path.join(__dirname, './entities/**.{js,ts}')],
      synchronize: true,
    }
  }

  if (nodeEnv === 'production') {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [entities],
      migrations: [migrations],
    }
  }

  return {
    type: 'postgres',
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT),
    synchronize: false,
    logging: false,
    entities: [entities],
    migrations: [migrations],
  }
}

const dataSourceConfig = setDataSourceConfig()
export default new DataSource(dataSourceConfig)
