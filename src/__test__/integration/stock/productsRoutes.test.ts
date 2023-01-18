import  request  from "supertest"
import { DataSource } from "typeorm"
import app from "../../../app"
import AppDataSource from "../../../data-source"
import { mockedUser, mockedUserLogin, newProduct, newProductInvalidUserId } from "../../mocks"



describe("/stock",() => {
    let connection: DataSource

    beforeAll(async () => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

        await request(app).post('/users').send(mockedUser)
        
    })

    afterAll(async () => {
        await connection.destroy()
    })


    test("POST /stock -  Must be able to create a product",async () => {
        const responseLogin = await request(app).post('/login').send(mockedUserLogin)
        const token = `Bearer ${responseLogin.body.token}`

        const response = await request(app).post("/stock").set("Authorization", token).send(newProduct)
        
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("amount")
        expect(response.body).toHaveProperty("stock")
        expect(response.status).toBe(201)
    
    })

    test("POST /stock - should not be able to create a product that already exists",async () => {
        const responseLogin = await request(app).post('/login').send(mockedUserLogin)
        const token = `Bearer ${responseLogin.body.token}`

        const response = await request(app).post("/stock").set("Authorization", token).send(newProduct)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(409)
    })

    test("POST /stock - should not be able to create another product without authorization",async () => {
        const response = await request(app).post("/stock").send(newProduct)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })
    
    test("GET /stock - Must be able to list all products",async () => {
        const responseLogin = await request(app).post('/login').send(mockedUserLogin)
        const token = `Bearer ${responseLogin.body.token}`
        
        const getProducts = await request(app).get("/stock").set("Authorization", token)

        expect(getProducts.body).toHaveLength(1)
        expect(getProducts.status).toBe(200)
    }) 

    test("PACH /stock/:id - should not be able to update another product without authorization",async () => {
        const updateProduct = {
            name: "produto atualizado"
        }

        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin)
        const token = `Bearer ${userLoginResponse.body.token}`


        const response = await request(app).patch(`/stock/${1}`).send(updateProduct)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)

    }) 
    
    test("PACH /stock/:id - should not be able to update nother product without invalid productId",async () => {
        const updateProduct = {
            name: "produto atualizado"
        }

        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin)
        const token = `Bearer ${userLoginResponse.body.token}`

        const response = await request(app).patch(`/stock/${123456}`).set("Authorization", token).send(updateProduct)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })
    
     test("PACH /stock/:id - should not be able to update another product by changing the user",async () => {
        const updateProduct = {
            user: "usuario atualizado"
        }

        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin)
        const token = `Bearer ${userLoginResponse.body.token}`

        const response = await request(app).patch(`/stock/${1}`).set("Authorization", token).send(updateProduct)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)

    }) 

    test("PACH /stock/:id - must be able update product",async () => {
        const updateProduct = {
            name: "produto atualizado"
        }

        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin)
        const token = `Bearer ${userLoginResponse.body.token}`

        const response = await request(app).patch(`/stock/${1}`).set("Authorization", token).send(updateProduct)

        const productUpdated = await request(app).get(`/stock/${1}`).set("Authorization", token)

        expect(productUpdated.body.name).toEqual("produto atualizado")
        expect(response.status).toBe(200)
    })


    test("DELETE /stock/:id - should not be able to delete another product without authorization", async () => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin)
        const token = `Bearer ${userLoginResponse.body.token}`

        const response = await request(app).delete(`/stock/${1}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    //Criar um middleware para tratar de ID errado
    test("DELETE /stock/:id - should not be able to delete nother product without invalid productId",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin)
        const token = `Bearer ${userLoginResponse.body.token}`

        const response = await request(app).delete(`/stock/${123456}`).set("Authorization", token)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })

    test("DELETE /stock/:id - must be able delete product",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin)
        const token = `Bearer ${userLoginResponse.body.token}`

        const response = await request(app).delete(`/stock/${1}`).set("Authorization", token)

        const getProducts = await request(app).get("/stock").set("Authorization", token)

        expect(response.status).toBe(204)
    })  


})
