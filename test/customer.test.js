const app = require("../app")
const request = require("supertest")

const standardRespone = {
    status: expect.any(Number),
    description: expect.any(String),
    result: expect.any(Array)
}


describe("service /customers", () => {

    describe("GET /customers", () => {

        test("harus mengembalikan statuscode 200", async () => {
            const respone = await request(app).get("/customer")
            expect(respone.statusCode).toBe(200)
        })

        test("harus mengembalikan standard respone", async () => {
            const respone = await request(app).get("/customer")
            expect(respone.body).toEqual(expect.objectContaining(standardRespone))
        })
    })

    // describe("POST /customers", () => {
    //     test("harus mengembalikan statuscode 201", async () => {
    //         const respone = await request(app).post("/customer").send({
    //             name: "iyal",
    //             email: "iyal@mail.com",
    //             password: 1234
    //         })
    //         expect(respone.statusCode).toBe(201)
    //     })


    // })

    describe("PUT /customers", () => {
        test("harus mengembalikan statuscode 201", async () => {
            const respone = await request(app).put("/customer/reset/iyal@mail.com").send({
                password: "1234",
            })
            expect(respone.statusCode).toBe(201)
        })
    })

    describe("GET /customers/", () => {

        test("harus mengembalikan statuscode 200", async () => {
            const respone = await request(app).get("/customer/address")
            expect(respone.statusCode).toBe(200)
        })
    })

    // describe("POST /customers", () => {
    //     test("harus mengembalikan statuscode 200", async () => {
    //         const respone = await request(app).post("/customer/address").send({
    //             address_tempat: "rumah",
    //             address_nama: "mamah",
    //             address_telepon: 62555,
    //             address_alamat: "kp. babakan kamulyan",
    //             address_kodepos: 40553,
    //             address_kota: "bandung",
    //             address_email: "test@mail.com"
    //         })
    //         expect(respone.statusCode).toBe(200)
    //     })


    // })


})
