require("dotenv/config")
const express = require("express")
const server = express()
const morgan = require("morgan")
const main = require("./src/main")
const cors = require('cors')

server.use(cors())
server.use(morgan("dev"))
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use("/public", express.static("public"))
server.use(main)

server.get('api/product/produk_harga', function(req, res, next) {
    res.json({msg: 'this is CORS-enable for all origins!'})
})

module.exports = server
