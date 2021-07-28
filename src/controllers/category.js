const categories = {}
const model = require("../models/categories")
const respone = require("../helper/respone")
//const { redisDb } = require("../configs/redis")
const Logger = require("../helper/logger")

categories.getAll = async (req, res) => {
    try {
        const result = await model.getAll()
          respone(res, 200, result)
          return Logger.http('get all category table success')
    } catch (error) {
          respone(res, 500, error, true)
          return Logger.error(error)
    }
}

categories.Save = async (req, res) => {
    try {
        const result = await model.Save(req.query)
        //redisDb.del("categories")
          respone(res, 201, result)
          return Logger.http('add category data success')
    } catch (error) {
          respone(res, 500, error, true)
          return Logger.error(error)
    }
}

categories.removeData = async (req, res) => {
    try {
        const result = await model.Delete(req.params.kategori_id)
          respone(res, 200, result)
          return Logger.http('remove category data success')
    } catch (error) {
          respone(res, 500, error)
          return Logger.error(error)
    }
}

categories.updateData = async (req, res) => {
    try {
        const result = await model.Update(req.params.id, req.query)
          respone(res, 200, result)
          return Logger.http('update category data success')
    } catch (error) {
          respone(res, 500, error)
          return Logger.error(error)
    }
}

module.exports = categories