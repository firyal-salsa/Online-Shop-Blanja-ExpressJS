const app = require("../app")
const request = require("supertest")

const standardRespone = {
    status: expect.any(Number),
    description: expect.any(String),
    result: expect.any(Array)
}


describe("service /bags", () => {

    describe("GET /bags", () => {

        test("harus mengembalikan statuscode 200", async () => {
            const respone = await request(app).get("/bag")
            expect(respone.statusCode).toBe(200)
        })

        test("harus mengembalikan standard respone", async () => {
            const respone = await request(app).get("/bag")
            expect(respone.body).toEqual(expect.objectContaining(standardRespone))
        })
    })


    describe("DELETE /bags", () => {
        test("harus mengembalikan statuscode 200", async () => {
            const respone = await request(app).delete("/bag/rem/1")
            expect(respone.statusCode).toBe(200)
        })

    })

    describe("PUT /bags", () => {
        test("harus mengembalikan statuscode 200", async () => {
            const respone = await request(app).put("/bag/update/1").send({
                bag_jumlah: 1,
                bag_produk_id: 1
            })
            expect(respone.statusCode).toBe(200)
        })
    })

})
