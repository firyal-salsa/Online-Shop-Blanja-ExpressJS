const customer = {}
const model = require("../models/customers")
const modelAddress = require("../models/address")
const passwordHash = require("../helper/hash")
const respone = require("../helper/respone")
const Logger = require("../helper/logger")
const uploads = require("../helper/uploadCloud")

customer.getAll = async (req, res) => {
    try {
        const result = await model.getAll(req.body)
          respone(res, 200, result)
          return Logger.http('get all customer table success')
    } catch (error) {
          respone(res, 500, error)
          return Logger.error(error)
    }
}

customer.SaveCS = async (req, res) => {
    try {
        const passHash = await passwordHash(req.body.password)
        let urlImage = ""
        if (req.file !== undefined) {
            urlImage = await uploads(req.file.path)
        }
        const data = {
            name : req.body.name, 
            email : req.body.email,
            password : passHash,
            phone_number: req.body.phone_number,
            gender: req.body.gender,
            birthday: req.body.birthday,
            foto:urlImage || req.file.path,
        }
        const result = await model.SaveCS(data)
          respone(res, 201, result)
          return Logger.http('add data user success')
    } catch (error) {
          respone(res, 500, error, true)
          return Logger.error(error)
    }
}

customer.manageProfile = async (req, res) => {
    try {
        let urlImage = ""
        if (req.file !== undefined) {
            urlImage = await uploads(req.file.path)
        }
        const data = {
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            gender: req.body.gender,
            birthday: req.body.birthday,
            foto:urlImage || req.file.path,
        }
        const result = await model.Update(req.params.email,data)
          respone(res, 201, result)
          return Logger.http('manage customer profile success')
    } catch (error) {
        console.log(error)
        return Logger.error(error)
    }
}

customer.getAllAdress = async (req, res) => {
    try {
        const result = await modelAddress.getAllAdress()
          respone(res, 200, result)
          return Logger.http('get all address table success')
    } catch (error) {
          respone(res, 500, error, true)
          return Logger.error(error)
    }
}

customer.SaveAdress = async (req, res) => {
    try {
        const result = await modelAddress.SaveAdress(req.body)
          respone(res, 200, result)
          return Logger.http('add address data success')
    } catch (error) {
          respone(res, 500, error, true)
          return Logger.error(error)
    }
}

customer.DeleteAdress = async (req, res) => {
    try {
        const result = await modelAddress.DeleteAddress(req.params.id)
          respone(res, 200, result)
          return Logger.http('remove address data success')
    } catch (error) {
          respone(res, 500, error)
          return Logger.error(error)
    }
}


customer.resetPassword = async (req, res) => {
    try {
        const passHash = await passwordHash(req.body.password)
        const data = {
            password : passHash
        }
        const result = await model.resetPassword(req.params.email,data)
          respone(res, 201, result)
          return Logger.http('update password user success')
    } catch (error) {
        console.log(error)
        return Logger.error(error)
    }
}


module.exports = customer