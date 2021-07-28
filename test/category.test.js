const app = require("../app")
const request = require("supertest")

const standardRespone = {
    status: expect.any(Number),
    description: expect.any(String),
    result: expect.any(Array)
}


describe("service /categories", () => {

    describe("GET /categories", () => {

        test("harus mengembalikan statuscode 200", async () => {
            const respone = await request(app).get("/category")
            expect(respone.statusCode).toBe(200)
        })

        test("harus mengembalikan standard respone", async () => {
            const respone = await request(app).get("/category")
            expect(respone.body).toEqual(expect.objectContaining(standardRespone))
        })
    })


    describe("DELETE /categories", () => {
        test("harus mengembalikan statuscode 200", async () => {
            const respone = await request(app).delete("/category/rem/1")
            expect(respone.statusCode).toBe(200)
        })

    })

    describe("PUT /categories", () => {
        test("harus mengembalikan statuscode 200", async () => {
            const respone = await request(app).put("/category/update/1").send({
                kategori_nama: "test"
            })
            expect(respone.statusCode).toBe(200)
        })
    })

})
