const express = require("express")
const routing = express.Router()
const product = require("./routes/product")
const category = require("./routes/category")
const bag = require("./routes/bag")
const customer = require("./routes/customer")
const seller = require("./routes/seller")
const auth = require("./routes/auth")
const cs = require("./routes/authcs")
const { cloudConfig } = require("./configs/cloudinary")

routing.use("*", cloudConfig)
routing.use("/product", product)
routing.use("/category", category)
routing.use("/bag", bag)
routing.use("/customer", customer)
routing.use("/seller", seller)
routing.use("/auth", auth)
routing.use("/authcs", cs)


routing.get('/cors', function(req, res, next) {
    res.json({msg: 'this is CORS-enable for all origins!'})
})

module.exports = routing
