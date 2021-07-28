const express = require("express")
const routing = express.Router()
const ctrl = require("../controllers/bag")
const validate = require("../middleware/validate")

routing.get("/", validate("customer"),ctrl.getAll)
routing.post("/", validate("customer"), ctrl.Save)
routing.delete("/rem/:id", validate("customer"),ctrl.removeData)
routing.put("/update/:id", validate("customer"), ctrl.updateData)

module.exports = routing