import 'express-async-errors'
import express from 'express'
import handleError from './errors/handleError'
import { salesRoutes } from './routes/sales.routes'
import { loginRoutes } from './routes/login.routes'
import { userRoutes } from './routes/user.routes'

const app = express()
app.use(express.json())

app.use('/users', userRoutes)
app.use('/login', loginRoutes)

app.use(handleError)

export default app
