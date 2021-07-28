const hash = require("./hash")

// untuk mengelompokan testing

describe("helper/hash", () => {
    test("harus mengembalikan random character", async () => {
        const result = await hash("yaw")
        console.log(result)
        expect(result).toEqual(expect.stringContaining("$"))
    })

    test("harus mengembalikan error jika parameter tidak diisi", async () => {
        try {
            const result = await hash()
            expect(result).toBe(false)
        } catch (error) {
            console.log(error.message)
            expect(error.message).toBe("data and salt arguments required")
        }
    })
})