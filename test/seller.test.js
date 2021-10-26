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
        .post('/seller')
        .send({
          name: 'iyal',
          password: 'abc123',
        })
        .end((err, response) => {
          token = response.body.token; // save the token!
          done();
        });
    });

    const seller = {
        email: "f@mail.com",
        name: "test",
        phone_number: 62811,
        store_name: 'zz',
        store_description: 'fashion',
        password: "123qwerty",
        foto: ""
    };

describe("service /seller", () => {

    describe("GET /seller", () => {

        test("harus mengembalikan statuscode 200", async () => {
            const respone = await request(app).get("/seller")
            expect(respone.statusCode).toBe(200)
        })

        test("harus mengembalikan standard respone", async () => {
            const respone = await request(app).get("/seller")
            expect(respone.body).toEqual(expect.objectContaining(standardRespone))
        })
    })

    describe("POST /sellers", () => {

        test('harus mengembalikan status 200', async() => {
            try {
                const respone = await request(app).set('Authorization', `Token ${token}`).post('/seller').send(seller)
                expect(respone.statusCode).toBe(200)
            } catch (err) {
                console.log(`Error ${err}`)
            }
        }); 

        test("harus mengembalikan json sebagai tipe konten di header http", async () => {
            const respone = await request(app).post("/seller").send(seller)
            expect(respone.headers['content-type']).toEqual(expect.stringContaining('json'))
        })
    })

    describe("PUT /seller", () => {
        test('harus mengembalikan status 200', async() => {
            const sellerUpdate = { password: "12345"}
            try {
                const respone = await request(app).set('Authorization', `Token ${token}`).put('/seller/update/1').send(sellerUpdate)
                expect(respone.statusCode).toBe(200)
            } catch (err) {
                console.log(`Error ${err}`)
            }
        }); 
    })


})
