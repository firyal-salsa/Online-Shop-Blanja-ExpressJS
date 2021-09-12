const express = require("express")
const routing = express.Router()
const ctrl = require("../controllers/customer")
const validate = require("../middleware/validate")
const uploads = require("../middleware/upload")

routing.get("/", ctrl.getAll)
routing.post("/", uploads.single("foto"), ctrl.SaveCS)
routing.put("/manage/:email",validate("customer"), uploads.single("foto"), ctrl.manageProfile)
routing.put("/reset/:email", validate("customer"),ctrl.resetPassword)
routing.get("/address", validate("customer"),ctrl.getAllAdress)
routing.post("/address", validate("customer"), ctrl.SaveAdress)
routing.delete("/address/rem/:id", validate("customer"), ctrl.DeleteAdress)

module.exports = routing