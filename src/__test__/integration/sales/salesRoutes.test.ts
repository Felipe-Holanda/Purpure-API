import request from 'supertest'
import { DataSource } from 'typeorm'
import app from '../../../app'
import AppDataSource from '../../../data-source'
import {
  mockedUser,
  mockedUserLogin,
  newClient,
  newProduct,
  newSale,
  saleId,
} from '../../mocks'

describe('/Sales', () => {
  let connection: DataSource

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err)
      })

    await request(app).post('/users').send(mockedUser)
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test('POST /sales - Must be able to create a sale', async () => {
    const responseLogin = await request(app)
      .post('/login')
      .send(mockedUserLogin)

    const token = `Bearer ${responseLogin.body.token}`

    await request(app)
      .post('/clients')
      .set('Authorization', token)
      .send(newClient)
    await request(app)
      .post('/stock')
      .set('Authorization', token)
      .send(newProduct)
    const getClient = await request(app)
      .get('/clients')
      .set('Authorization', token)
    const getStock = await request(app)
      .get(`/stock/${1}`)
      .set('Authorization', token)
    newSale.client = getClient.body[0].id
    newSale.stock = getStock.body.id

    const response = await request(app)
      .post('/sales')
      .set('Authorization', token)
      .send(newSale)

    saleId.id = response.body.id

    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('amount')
    expect(response.body).toHaveProperty('value')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body).toHaveProperty('clientName')
    expect(response.status).toBe(201)
  })

  test('POST /sales - should not be able to create another sales without authorization', async () => {
    const responseLogin = await request(app)
      .post('/login')
      .send(mockedUserLogin)

    const token = `Bearer ${responseLogin.body.token}`

    const response = await request(app).post('/sales').send(newSale)

    expect(response.body).toHaveProperty('message')
    expect(response.status).toBe(401)
  })

  test('GET /sales -  Must be able to list all sales', async () => {
    const responseLogin = await request(app)
      .post('/login')
      .send(mockedUserLogin)

    const token = `Bearer ${responseLogin.body.token}`

    const response = await request(app)
      .get('/sales')
      .set('Authorization', token)

    expect(response.body).toHaveLength(1)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0]).toHaveProperty('sales')
    expect(response.status).toBe(200)
  })

  test('GET /sales -  should not be able to get all sales without authorization', async () => {
    const responseLogin = await request(app)
      .post('/login')
      .send(mockedUserLogin)

    const token = `Bearer ${responseLogin.body.token}`

    const response = await request(app).get('/sales')

    expect(response.body).toHaveProperty('message')
    expect(response.status).toBe(401)
  })

  test('GET /sales/:id - should not be able to update another sales without authorization', async () => {
    const responseLogin = await request(app)
      .post('/login')
      .send(mockedUserLogin)

    const token = `Bearer ${responseLogin.body.token}`
    const response = await request(app).get(`/sales/${saleId.id}`)

    expect(response.body).toHaveProperty('message')
    expect(response.status).toBe(401)
  })

  test('GET /sales/:id - should not be able to update nother sale without invalid saleId', async () => {
    const responseLogin = await request(app)
      .post('/login')
      .send(mockedUserLogin)

    const token = `Bearer ${responseLogin.body.token}`
    const response = await request(app)
      .get(`/sales/123`)
      .set('Authorization', token)

    expect(response.body).toHaveProperty('message')
    expect(response.status).toBe(404)
  })

  test('GET /sales/:id - must be able get a sale', async () => {
    const responseLogin = await request(app)
      .post('/login')
      .send(mockedUserLogin)
    const token = `Bearer ${responseLogin.body.token}`

    const response = await request(app)
      .get(`/sales/${saleId.id}`)
      .set('Authorization', token)

    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('client')
    expect(response.status).toBe(200)
  })
})
