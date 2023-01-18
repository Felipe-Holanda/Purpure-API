import  request  from "supertest"
import { DataSource } from "typeorm"
import app from "../../../app"
import AppDataSource from "../../../data-source"
import { mockedUser, mockedUserLogin, newClient, newClientInvalidUserId } from "../../mocks"



describe("/clients",() => {
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


    test("POST /clients -  Must be able to create a client",async () => {
        const responseLogin = await request(app).post('/login').send(mockedUserLogin)
        
        const token = `Bearer ${responseLogin.body.token}`
    
        const response = await request(app).post("/clients").set("Authorization", token).send(newClient)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("document")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("phone")
        expect(response.status).toBe(201)
    
    })
    
    test("POST /clients - should not be able to create a client that already exists",async () => {
        const responseLogin = await request(app).post('/login').send(mockedUserLogin)
        const token = `Bearer ${responseLogin.body.token}`
    
        const response = await request(app).post("/clients").set("Authorization", token).send(newClient)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })


    test("POST /clients - should not be able to create another client without authorization",async () => {
        const response = await request(app).post("/clients").send(newClient)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("GET /clients - Must be able to list all clients",async () => {
        const responseLogin = await request(app).post('/login').send(mockedUserLogin)
        const token = `Bearer ${responseLogin.body.token}`

        const getProducts = await request(app).get("/clients").set("Authorization", token)

        expect(getProducts.body).toHaveLength(1)
        expect(getProducts.status).toBe(200)
    }) 

    test("PACH /clients/:id - should not be able to update another client without authorization",async () => {
        const updateClient = {
            name: "cliente atualizado"
        }

        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin)
        const token = `Bearer ${userLoginResponse.body.token}`

        const clientTobeUpdateRequest = await request(app).get("/clients").set("Authorization", token)
        const clientTobeUpdateId = clientTobeUpdateRequest.body[0].id

        const response = await request(app).patch(`/clients/${clientTobeUpdateId}`).send(updateClient)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)

    }) 
    
    test("PACH /clients/:id - should not be able to update nother client without invalid clientId",async () => {
        const updateClient = {
            name: "cliente atualizado"
        }

        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin)
        const token = `Bearer ${userLoginResponse.body.token}`

        const clientTobeUpdateRequest = await request(app).get("/clients").set("Authorization", token)
        const clientTobeUpdateId = clientTobeUpdateRequest.body.id

        const response = await request(app).patch(`/clients/123456`).set("Authorization", token).send(updateClient)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })

    test("PACH /clients/:id - should not be able to update another client by changing the user",async () => {
        const updateClient = {
            user: "usuario atualizado"
        }

        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin)
        const token = `Bearer ${userLoginResponse.body.token}`

        const productTobeUpdateRequest = await request(app).get("/clients").set("Authorization", token)
        const productTobeUpdateId = productTobeUpdateRequest.body[0].id
        const response = await request(app).patch(`/clients/${productTobeUpdateId}`).set("Authorization", token).send(updateClient)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)

    })

    test("PACH /clients/:id - must be able update client",async () => {
        const updateClient = {
            name: "cliente atualizado",
            email: "novo@gmail.com",
	        phone: "19345678999"
        }

        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin)
        const token = `Bearer ${userLoginResponse.body.token}`

        const productTobeUpdateRequest = await request(app).get("/clients").set("Authorization", token)
        const productTobeUpdateId = productTobeUpdateRequest.body[0].id

        const response = await request(app).patch(`/clients/${productTobeUpdateId}`).set("Authorization", token).send(updateClient)

        const clientUpdated = await request(app).get(`/clients/${productTobeUpdateId}`).set("Authorization", token)

        expect(clientUpdated.body.name).toEqual("cliente atualizado")
        expect(response.status).toBe(200)
    })


    test("DELETE /clients/:id - should not be able to delete another client without authorization", async () => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin)
        const token = `Bearer ${userLoginResponse.body.token}`

        const clientTobeUpdateRequest = await request(app).get("/clients").set("Authorization", token)
        const clientTobeUpdateId = clientTobeUpdateRequest.body.id

        const response = await request(app).delete(`/clients/${clientTobeUpdateId}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("DELETE /clients/:id - should not be able to delete nother product without invalid productId",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin)
        const token = `Bearer ${userLoginResponse.body.token}`

        const clientTobeUpdateRequest = await request(app).get("/clients").set("Authorization", token)
        const clientTobeUpdateId = clientTobeUpdateRequest.body.id

        const response = await request(app).delete(`/clients/123456`).set("Authorization", token)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })

    test("DELETE /clients/:id - must be able delete product",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin)
        const token = `Bearer ${userLoginResponse.body.token}`

        const clientTobeDeletedRequest = await request(app).get("/clients").set("Authorization", token)
        const clientTobeDeleted = clientTobeDeletedRequest.body[0].id
        
        const response = await request(app).delete(`/clients/${clientTobeDeleted}`).set("Authorization", token)

        expect(response.status).toBe(204)
    })  
}) 