const respone = require("./respone")

const res = {
    obj: {},
    statusCode: 0,
    status(code) {
        this.statusCode = code
        return this
    },
    json(data) {
        this.obj = data
        return this
    },
}

res.status(200).json()

describe("helper/respone", () =>{
    test("harus mengembalikan array of object", () => {
        const check = respone(res, 200, {msg: "hallo world"})
        const { result } = check.obj
        console.log(check)
        expect(result).toHaveLength(1)
    })

    test("harus mengembalikan var DESC = OK", () => {
        const check = respone(res, 200, { msg: "hallo world"})
        expect(check.obj.description).toBe("OK")
    })

    test("harus mengembalikan var DESC = Created", () => {
        const check = respone(res, 201, { msg: "hallo world"})
        expect(check.obj.description).toBe("Created")
    })

    test("harus mengembalikan var DESC = Not Modified", () => {
        const check = respone(res, 304, { msg: "hallo world"})
        expect(check.obj.description).toBe("Not Modified")
    })

    test("harus mengembalikan var DESC = Bad Request", () => {
        const check = respone(res, 400, { msg: "hallo world"})
        expect(check.obj.description).toBe("Bad Request")
    })

    test("harus mengembalikan var DESC = Unauthorized", () => {
        const check = respone(res, 401, { msg: "hallo world"})
        expect(check.obj.description).toBe("Unauthorized")
    })

    test("harus mengembalikan var DESC = Not Found", () => {
        const check = respone(res, 404, { msg: "hallo world"})
        expect(check.obj.description).toBe("Not Found")
    })

    test("harus mengembalikan var DESC = Unauthorized", () => {
        const check = respone(res, 500, { msg: "hallo world"})
        expect(check.obj.description).toBe("Internal Server Error")
    })

    test("harus mengembalikan var DESC = Bad Gateway", () => {
        const check = respone(res, 501, { msg: "hallo world"})
        expect(check.obj.description).toBe("Bad Gateway")
    })
    
})