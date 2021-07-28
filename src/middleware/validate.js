const respone = require("../helper/respone")
const jwt = require("jsonwebtoken")

const checkToken = (role) => {
    return (req, res, next) => {
        const { tokenauth } = req.headers

        if (!tokenauth) {
            return respone(res, 401, { msg: "Silahkan login"})
        }

        jwt.verify(tokenauth, process.env.JWT_KEYS, (err, decode) => {
            if(err){
                return respone(res, 401, err)
            }
            if(decode.role === role){
                next()
            }else{
                return respone(res, 401, { msg: "Akses tidak diizinkan"})
            }
        })
    }
}

module.exports = checkToken