const express = require("express")
const routing = express.Router()
const ctrl = require("../controllers/category")
const validate = require("../middleware/validate")

routing.get("/", ctrl.getAll)
routing.post("/", validate("seller"), ctrl.Save)
routing.delete("/rem/:kategori_id", validate("seller"),ctrl.removeData)
routing.put("/update/:id", validate("seller"),ctrl.updateData)

module.exports = routing