const express = require("express")
const routing = express.Router()
const ctrl = require("../controllers/auth")

routing.post("/", ctrl.login)

module.exports = routing