require("dotenv/config")
const express = require("express")
const server = express()
const morgan = require("morgan")
const main = require("./src/main")


server.use(morgan("dev"))
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use("/public", express.static("public"))
server.use(main)

module.exports = server