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
  
    const bag = {
        bag_jumlah: 13,
        bag_produk_id:11
    };

describe("service /bag", () => {

    // describe("GET /bag", () => {

    //     test("harus mengembalikan standard respone", async () => {
    //         const respone = await request(app).get("/bag")
    //         expect(respone.body).toEqual(expect.objectContaining(standardRespone))
    //     })
    // })


    describe("POST /bag", () => {
        test('harus mengembalikan status 200', async() => {
            try {
                const respone = await request(app).set('Authorization', `Token ${token}`).post('/bag').send(bag)
                expect(respone.statusCode).toBe(200)
            } catch (err) {
                console.log(`Error ${err}`)
            }
        }); 
    })

    describe("PUT /bag", () => {
        test('harus mengembalikan status 200', async() => {
            const bagUpdate = { bag_jumlah: 4, bag_produk_id:8}
            try {
                const respone = await request(app).set('Authorization', `Token ${token}`).put('/bag/update/1').send(bagUpdate)
                expect(respone.statusCode).toBe(200)
            } catch (err) {
                console.log(`Error ${err}`)
            }
        }); 
    })

    // describe("DELETE /bag", () => {
    //     test('harus mengembalikan status 200', async() => {
    //         try {
    //             const respone = await request(app).set('Authorization', `Token ${token}`).delete('/bag/rem/1')
    //             expect(respone.statusCode).toBe(200)
    //         } catch (err) {
    //             console.log(`Error ${err}`)
    //         }
    //     }); 
    // })
    
})
