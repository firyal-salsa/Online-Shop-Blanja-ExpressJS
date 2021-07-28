const bags = {}
const model = require("../models/bags")
const respone = require("../helper/respone")
const Logger = require("../helper/logger")

bags.getAll = async (req, res) => {
    try {
        const result = await model.getAll()
           respone(res, 200, result)
           return Logger.http('get all data bag success')
    } catch (error) {
           respone(res, 500, error, true)
           return Logger.error(error)
    }
}

bags.Save = async (req, res) => {
    try {
        const data = {
            bag_jumlah: req.body.bag_jumlah,
            bag_produk_id: req.body.products
        }
        const result = await model.Save(data)
        respone(res, 201, result)
        return Logger.http('add bag data success')
    } catch (error) {
        respone(res, 500, error)
        return Logger.error(error)
    }
}

bags.removeData = async (req, res) => {
    try {
        const result = await model.Delete(req.params.id)
        respone(res, 200, result)
        return Logger.http('remove bag data success')
    } catch (error) {
        respone(res, 500, error)
        return Logger.error(error)
    }
}

bags.updateData = async (req, res) => {
    try {
        const result = await model.Update(req.params.id, req.body)
        respone(res, 200, result)
        return Logger.http('update bag data success')
    } catch (error) {
        respone(res, 500, error)
        return Logger.error(error)
    }
}

module.exports = bags