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

    const customer = {
                    email: "f@mail.com",
                    name: "test",
                    phone_number: 62811,
                    gender: "laki-laki",
                    birthday: "01-01-1990",
                    password: "123qwerty",
                    foto: ""
                };

describe("service /customer", () => {

    describe("GET /customer", () => {

        test("harus mengembalikan statuscode 200", async () => {
            const respone = await request(app).get("/customer")
            expect(respone.statusCode).toBe(200)
        })

        test("harus mengembalikan standard respone", async () => {
            const respone = await request(app).get("/customer")
            expect(respone.body).toEqual(expect.objectContaining(standardRespone))
        })
    })

    describe("POST /customers", () => {

        test('harus mengembalikan status 200', async() => {
            try {
                const respone = await request(app).set('Authorization', `Token ${token}`).post('/customer').send(customer)
                expect(respone.statusCode).toBe(200)
            } catch (err) {
                console.log(`Error ${err}`)
            }
        }); 

        test("harus mengembalikan json sebagai tipe konten di header http", async () => {
            const respone = await request(app).post("/customer").send(customer)
            expect(respone.headers['content-type']).toEqual(expect.stringContaining('json'))
        })
    })

    describe("PUT /customer", () => {
        test('harus mengembalikan status 200', async() => {
            const customerUpdate = { password: "12345"}
            try {
                const respone = await request(app).set('Authorization', `Token ${token}`).put('/customer/update/1').send(customerUpdate)
                expect(respone.statusCode).toBe(200)
            } catch (err) {
                console.log(`Error ${err}`)
            }
        }); 
    })


})
