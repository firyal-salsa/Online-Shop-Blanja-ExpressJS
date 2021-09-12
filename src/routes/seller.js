const express = require("express")
const routing = express.Router()
const ctrl = require("../controllers/seller")
const validate = require("../middleware/validate")
const uploads = require("../middleware/upload")

routing.get("/", ctrl.getAll)
routing.post("/",uploads.single("foto"), ctrl.Save)
routing.put("/reset/:email",validate("seller"), ctrl.resetPassword)
routing.put("/manage/:email",validate("seller"), uploads.single("foto"), ctrl.manageProfile)
routing.get("/inventory", validate("seller"),ctrl.getAllInventory)
routing.get("/inventory/soldout", validate("seller"),ctrl.soldOut)
routing.post("/inventory", validate("seller"),uploads.single('inventori_foto'), ctrl.saveInventory)
routing.put("/inventory/:inventori_id", validate("seller"),uploads.single('inventori_foto'), ctrl.updateInventory)
routing.delete("/inventory/rem/:inventori_id", validate("seller"),ctrl.removeInventory)

module.exports = routing