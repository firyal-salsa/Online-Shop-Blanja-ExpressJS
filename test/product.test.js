const app = require("../app")
const request = require("supertest")

const standardRespone = {
    status: expect.any(Number),
    description: expect.any(String),
    result: expect.any(Array)
}


describe("service /products", () => {

    describe("GET /products", () => {

        test("harus mengembalikan statuscode 200", async () => {
            const respone = await request(app).get("/product")
            expect(respone.statusCode).toBe(200)
        })

        test("harus mengembalikan standard respone", async () => {
            const respone = await request(app).get("/product")
            expect(respone.body).toEqual(expect.objectContaining(standardRespone))
        })
    })

    describe("POST /products", () => {
        test("harus mengembalikan statuscode 200", async () => {
            const respone = await request(app).post("/product").send({
                produk_nama: "test",
                produk_harga: 5.1,
                produk_toko: "Zalora",
                produk_terjual: 10,
                produk_foto: "",
                produk_kategori_id: 1,
            })
            expect(respone.statusCode).toBe(200)
        })

        test("harus mengembalikan json sebagai tipe konten di header http", async () => {
            const respone = await request(app).post("/product").send({
                produk_nama: "test",
                produk_harga: 5.1,
                produk_toko: "Zalora",
                produk_terjual: 10,
                produk_foto: "",
                produk_kategori_id: 1,
            })
            expect(respone.headers['content-type']).toEqual(expect.stringContaining('json'))
        })


    })

    describe("DELETE /products", () => {
        test("harus mengembalikan statuscode 200", async () => {
            const respone = await request(app).delete("/product/rem/1")
            expect(respone.statusCode).toBe(200)
        })

    })

    describe("PUT /products", () => {
        test("harus mengembalikan statuscode 200", async () => {
            const respone = await request(app).put("/product/update/1").send({
                produk_nama: "test",
                produk_harga: 5.1,
                produk_toko: "Zalora",
                produk_terjual: 10,
                produk_foto: "",
                produk_kategori_id: 1,
            })
            expect(respone.statusCode).toBe(200)
        })
    })

    describe("GET /products/produk_nama", () => {

        test("harus mengembalikan statuscode 200", async () => {
            const respone = await request(app).get("/product/produk_nama")
            expect(respone.statusCode).toBe(200)
        })

        test("harus mengembalikan standard respone", async () => {
            const respone = await request(app).get("/product/produk_nama")
            expect(respone.body).toEqual(expect.objectContaining(standardRespone))
        })
    })

    describe("GET /products/id", () => {

        test("harus mengembalikan statuscode 200", async () => {
            const respone = await request(app).get("/product/id")
            expect(respone.statusCode).toBe(200)
        })

        test("harus mengembalikan standard respone", async () => {
            const respone = await request(app).get("/product/id")
            expect(respone.body).toEqual(expect.objectContaining(standardRespone))
        })
    })

    describe("GET /products/produk_harga", () => {

        test("harus mengembalikan statuscode 200", async () => {
            const respone = await request(app).get("/product/produk_harga")
            expect(respone.statusCode).toBe(200)
        })

        test("harus mengembalikan standard respone", async () => {
            const respone = await request(app).get("/product/produk_harga")
            expect(respone.body).toEqual(expect.objectContaining(standardRespone))
        })
    })


})
