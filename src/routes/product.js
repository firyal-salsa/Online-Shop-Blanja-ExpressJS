const express = require("express")
const routing = express.Router()
const ctrl = require("../controllers/product")
const validate = require("../middleware/validate")
const uploads = require("../middleware/upload")
const cache = require("../middleware/cache")

routing.get("/", cache, ctrl.getAll)
routing.get("/produk_nama", ctrl.productName)
routing.get("/id", ctrl.getAll)
routing.get("/produk_harga", ctrl.productPrice)
routing.post("/", validate("seller"),uploads.single("produk_foto"), ctrl.Save)
routing.put("/update/:produk_id", validate("seller"),uploads.single("produk_foto"), ctrl.updateData)
routing.delete("/rem/:produk_id",validate("seller"), ctrl.removeData)


module.exports = routing