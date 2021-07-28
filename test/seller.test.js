const app = require("../app")
const request = require("supertest")

const standardRespone = {
    status: expect.any(Number),
    description: expect.any(String),
    result: expect.any(Array)
}


describe("service /sellers", () => {

    describe("GET /sellers", () => {

        test("harus mengembalikan statuscode 200", async () => {
            const respone = await request(app).get("/seller")
            expect(respone.statusCode).toBe(200)
        })

        test("harus mengembalikan standard respone", async () => {
            const respone = await request(app).get("/seller")
            expect(respone.body).toEqual(expect.objectContaining(standardRespone))
        })
    })


    describe("PUT /sellers", () => {
        test("harus mengembalikan statuscode 201", async () => {
            const respone = await request(app).put("/seller/reset/iyal@mail.com").send({
                password: "1234",
            })
            expect(respone.statusCode).toBe(201)
        })
    })


})
