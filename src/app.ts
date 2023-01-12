import 'express-async-errors'
import express from 'express'
import handleError from './errors/handleError'
import { salesRoutes } from './routes/sales.routes'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  console.log('helo world')

  return res.json('helo world')
})

app.use('/sales', salesRoutes)

app.use(handleError)
export default app
