const seller = {}
const model = require("../models/sellers")
const modelInventori = require("../models/inventory")
const passwordHash = require("../helper/hash")
const respone = require("../helper/respone")
const Logger = require("../helper/logger")
const uploads = require("../helper/uploadCloud")

seller.getAll = async (req, res) => {
    try {
        const result = await model.getAll(req.body)
          respone(res, 200, result)
          return Logger.http('get all seller table success')
    } catch (error) {
          respone(res, 500, error)
          return Logger.error(error)
    }
}

seller.Save = async (req, res) => {
    try {
        let urlImage = ""
        if (req.file !== undefined) {
            urlImage = await uploads(req.file.path)
        }else{
            urlImage = "https://res.cloudinary.com/dvehyvk3d/image/upload/v1635189155/user_em8uvb.png"
        }
        const passHash = await passwordHash(req.body.password)
        const data = {
            name : req.body.name, 
            email : req.body.email, 
            phone_number : req.body.phone_number, 
            store_name : req.body.store_name,
            password : passHash,
            foto : urlImage || req.file.path,
            store_description: req.body.store_description
        }
        const result = await model.Save(data)
          respone(res, 201, result)
          return Logger.http('add data seller success')
    } catch (error) {
          respone(res, 500, { msg: 'email sudah digunakan'}, true)
          return Logger.error(error)
    }
}

seller.manageProfile = async (req, res) => {
    try {
        let urlImage = ""
        if (req.file !== undefined) {
            urlImage = await uploads(req.file.path)
        }
        const passHash = await passwordHash(req.body.password)
        const data = {
            name : req.body.name, 
            email : req.body.email, 
            phone_number : req.body.phone_number, 
            store_name : req.body.store_name,
            password : passHash,
            foto : urlImage || req.file.path,
            store_description: req.body.store_description
        }
        const result = await model.Update(req.params.email,data)
          respone(res, 201, result)
          return Logger.http('manage seller profile success')
    } catch (error) {
        console.log(error)
        return Logger.error(error)
    }
}


seller.resetPassword = async (req, res) => {
    try {
        const passHash = await passwordHash(req.body.password)
        const data = {
            password : passHash
        }
        const result = await model.resetPassword(req.params.email,data)
          respone(res, 201, result)
          return Logger.http('update password seller success')
    } catch (error) {
        console.log(error)
        return Logger.error(error)
    }
}


seller.getAllInventory = async (req, res) => {
    try {
        const result = await modelInventori.getAllInventory(req.body)
          respone(res, 200, result)
          return Logger.http('get all inventory table success')
    } catch (error) {
          respone(res, 500, error)
          return Logger.error(error)
    }
}

seller.saveInventory = async (req, res) => {
    try {
        let urlImage = ""
        if (req.file !== undefined) {
            urlImage = await uploads(req.file.path)
        }
        const data = {
            inventori_nama : req.body.inventori_nama,
            inventori_unit_price: req.body.inventori_unit_price,
            inventori_stok : req.body.inventori_stok,
            inventori_kondisi : req.body.inventori_kondisi,
            inventori_foto: urlImage || req.file.path,
            inventori_deskripsi: req.body.inventori_deskripsi,
            inventori_seller: req.body.sellers,
        }

        const result = await modelInventori.SaveInventory(data)
        //redisDb.del("product")
           respone(res, 200, result)
           return Logger.http('save inventory data success')
    } catch (error) {
        res.send(error)
        return Logger.error(error)
    }

    

    
}

seller.updateInventory = async (req, res) => {
    try {
        let urlImage = ""
        if (req.file !== undefined) {
            urlImage = await uploads(req.file.path)
        }
        const data = {
            inventori_nama : req.body.inventori_nama,
            inventori_unit_price: req.body.inventori_unit_price,
            inventori_stok : req.body.inventori_stok,
            inventori_kondisi : req.body.inventori_kondisi,
            inventori_foto: urlImage || req.file.path,
            inventori_deskripsi: req.body.inventori_deskripsi,
            inventori_seller: req.body.sellers,
        }

        const result = await modelInventori.UpdateInventory(req.params.inventori_id,data)
        //redisDb.del("product")
           respone(res, 200, result)
           return Logger.http('update inventory data success')
    } catch (error) {
        res.send(error)
        return Logger.error(error)
    }
   
}

seller.removeInventory = async (req, res) => {
    try {
        const result = await modelInventori.Delete(req.params.inventori_id)
           respone(res, 200, result)
           return Logger.http('remove inventori data success')
    } catch (error) {
           respone(res, 500, error)
           return Logger.error(error)
    }
}

seller.soldOut = async (req, res) => {
    try {
        const result = await modelInventori.soldOut(req.body)
          respone(res, 200, result)
          return Logger.http('get all inventory table soldout success')
    } catch (error) {
          respone(res, 500, error)
          return Logger.error(error)
    }
}

module.exports = seller
