const app = require("../app")
const request = require("supertest")

const standardRespone = {
    status: expect.any(Number),
    description: expect.any(String),
    result: expect.any(Array)
}

let token;

    beforeAll((done) => {
      request(app)
        .post('/customer')
        .send({
          name: 'iyal',
          password: 'abc123',
        })
        .end((err, response) => {
          token = response.body.token; // save the token!
          done();
        });
    });

    const product = {
                produk_nama: "test",
                produk_harga: 5.1,
                produk_toko: "Zalora",
                produk_terjual: 10,
                produk_foto: "",
                produk_kategori_id: 1,
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

        test('harus mengembalikan status 200', async() => {
            try {
                const respone = await request(app).set('Authorization', `Token ${token}`).post('/product').send(product)
                expect(respone.statusCode).toBe(200)
            } catch (err) {
                console.log(`Error ${err}`)
            }
        }); 

        test("harus mengembalikan json sebagai tipe konten di header http", async () => {
            const respone = await request(app).post("/product").send(product)
            expect(respone.headers['content-type']).toEqual(expect.stringContaining('json'))
        })
    })

    describe("PUT /product", () => {
        test('harus mengembalikan status 200', async() => {
            const productUpdate = { 
                        produk_nama: "testest",
                        produk_harga: 7.8,
                        produk_toko: "Shop",
                        produk_terjual: 8,
                        produk_foto: "",
                        produk_kategori_id: 4
                    }
            try {
                const respone = await request(app).set('Authorization', `Token ${token}`).put('/product/update/1').send(productUpdate)
                expect(respone.statusCode).toBe(200)
            } catch (err) {
                console.log(`Error ${err}`)
            }
        }); 
    })

    describe("DELETE /product", () => {
        test('harus mengembalikan status 200', async() => {
            try {
                const respone = await request(app).set('Authorization', `Token ${token}`).delete('/product/rem/1')
                expect(respone.statusCode).toBe(200)
            } catch (err) {
                console.log(`Error ${err}`)
            }
        }); 
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
