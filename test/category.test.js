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
  
    const category = {
        kategori_nama: "test"
    };

describe("service /category", () => {

    describe("POST /category", () => {
        test('harus mengembalikan status 200', async() => {
            try {
                const respone = await request(app).set('Authorization', `Token ${token}`).post('/category').send(category)
                expect(respone.statusCode).toBe(200)
            } catch (err) {
                console.log(`Error ${err}`)
            }
        }); 
    })

    describe("PUT /category", () => {
        test('harus mengembalikan status 200', async() => {
            const categoryUpdate = { kategori_nama: "test123"}
            try {
                const respone = await request(app).set('Authorization', `Token ${token}`).put('/category/update/1').send(categoryUpdate)
                expect(respone.statusCode).toBe(200)
            } catch (err) {
                console.log(`Error ${err}`)
            }
        }); 
    })
    
})
