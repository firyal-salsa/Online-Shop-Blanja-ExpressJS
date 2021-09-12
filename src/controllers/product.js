const products = {}
const model = require("../models/products")
const respone = require("../helper/respone")
const uploads = require("../helper/uploadCloud")
const Logger = require("../helper/logger")

products.getAll = async (req, res) => {
    try {
        const result = await model.getAll()
           respone(res, 200, result)
           return Logger.http('get all data product success')
    } catch (error) {
           respone(res, 500, error, true)
           return Logger.error(error)
    }
}

products.Save = async (req, res) => {
    try {
        let urlImage = ""
        if (req.file !== undefined) {
            urlImage = await uploads(req.file.path)
        }
        const data = {
            produk_nama: req.body.produk_nama,
            produk_harga: req.body.produk_harga,
            produk_toko:req.body.produk_toko,
            produk_terjual:req.body.produk_terjual,
            produk_foto:urlImage || req.file.path,
            produk_kategori_id: req.body.categories,
        }

        const result = await model.Save(data)
        //redisDb.del("product")
           respone(res, 200, result)
           return Logger.http('add product data success')
    } catch (error) {
        res.send(error)
        console.log(error)
        return Logger.error(error)
    }
}

products.removeData = async (req, res) => {
    try {
        const result = await model.Delete(req.params.produk_id)
           respone(res, 200, result)
           return Logger.http('remove product data success')
    } catch (error) {
           respone(res, 500, error)
           return Logger.error(error)
    }
}

products.updateData = async (req, res) => {
    try {
        let urlImage = ""
        if (req.file !== undefined) {
            urlImage = await uploads(req.file.path)
        }
        const data = {
            produk_nama: req.body.produk_nama,
            produk_harga: req.body.produk_harga,
            produk_toko:req.body.produk_toko,
            produk_terjual:req.body.produk_terjual,
            produk_foto:urlImage || req.file.path,
            produk_kategori_id: req.body.categories,
        }

        const result = await model.Update(req.params.produk_id,data)
        redisDb.del("product")
           respone(res, 200, result)
           return Logger.http('update product data success')
    } catch (error) {
        res.send(error)
        return Logger.error(error)
    }
}


products.productName = async (req, res) => {
    try {
        const result = await model.sortByName(req.params.produk_nama)
           respone(res, 200, result)
           return Logger.http('get all product data by name success')
    } catch (error) {
           respone(res, 500, error)
           return Logger.error(error)
    }
}


products.productPrice = async (req, res) => {
    try {
        const result = await model.sortByPrice(req.params.produk_harga)
           respone(res, 200, result)
           return Logger.http('get all product data by price success')
    } catch (error) {
           respone(res, 500, error)
           return Logger.error(error)
    }
}

module.exports = products
