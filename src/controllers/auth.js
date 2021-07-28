const auth = {}
const model = require("../models/sellers")
const bcr = require("bcrypt")
const jwt = require("jsonwebtoken")
const respone = require("../helper/respone")
const Logger = require("../helper/logger")

let token = async function (email){
    try{
        const payload = {
            user: email,
            role: "seller"
        }
        const token = jwt.sign(payload, process.env.JWT_KEYS, { expiresIn: '1h' })
        const result = {
            message: "token telah dibuat, berhasil login",
            token: token,
        }
        return result
    } catch(error){
        throw error
    }
}


auth.login = async function (req, res) {
    try {
        const passDB = await model.getEmail(req.body.email)
        const passUsers = req.body.password
        const check = await bcr.compare(passUsers, passDB[0].password)

        if (check) {
            const result = await token(req.body.email)
            respone(res, 200, result)
            return Logger.http(result)
        } else {
            respone(res, 401, { msg: "Gagal login"})
            return Logger.http({ msg: "Gagal login"})
        }
    } catch (error) {
        respone(res, 500, error, true)
        return Logger.error(error)
    }
}


module.exports = auth
