const {orm} = require("../configs/db")
const {DataTypes, Sequelize} = require("sequelize")
const sellers = require("./sellers")

class Inventories {
    constructor() {
        this.table = orm.define("inventories", {
            inventori_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            inventori_nama: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            inventori_unit_price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            inventori_stok: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            inventori_kondisi: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            inventori_foto: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            inventori_deskripsi: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            inventori_seller: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: "sellers",
                    key: "email",
                },
            },
        })
        this.table.belongsTo(sellers.table,{
            foreignKey: "inventori_seller",
            as: "sellers",
        })
    }
    
    Delete(inventori_id) {
        return new Promise((resolve, reject) => {
            this.table.destroy({ where: { inventori_id } })
            .then(res => {
                resolve("berhasil menghapus data inventori")
            }).catch((err)=>{
                reject('gagal menghapus data inventori')
            })
        })
    }

    SaveInventory(data) {
        return new Promise((resolve, reject) => {
            this.table.create(data)
            .then(res => {
                resolve(res.toJSON())
            }).catch((err)=>{
                reject('mohon masukan data yang sesuai')
            })
        })
    }

    getAllInventory(){
        return new Promise((resolve, reject)=>{
            this.table
            .findAll({
                include: [{ model: sellers.table, as: "sellers" }],
                order: [['updatedAt', 'DESC']],
            }).then(res => {
                resolve(res)
            })
            .catch((err)=>{
                console.log(err)
                reject('gagal menampilkan data inventori')
            })
        })
    }

    DeleteInventory(inventori_id) {
        return new Promise((resolve, reject) => {
            this.table.destroy({ where: { inventori_id } })
            .then(res => {
                resolve("berhasil menghapus data inventori")
            }).catch((err)=>{
                reject('gagal menghapus data inventori')
            })
        })
    }


    UpdateInventory(inventori_id, data) {
        return new Promise((resolve, reject) => {
            this.table.update({
                inventori_nama : data.inventori_nama,
                inventori_unit_price: data.inventori_unit_price,
                inventori_stok : data.inventori_stok,
                inventori_kondisi : data.inventori_kondisi,
                inventori_foto : data.inventori_foto,
                inventori_deskripsi: data.inventori_deskripsi
              }, {
                where: {
                    inventori_id: inventori_id
                }
              })
            .then(res => {
                resolve(`Berhasil mengubah data id ke ${inventori_id}`)
            }).catch((err)=>{
                console.log(err)
                reject('gagal mengubah data inventori')
            })
        })
    }

    allItems(){
        return new Promise((resolve, reject)=>{
            this.table
            .findAll({
                order: [['updatedAt', 'DESC']],
            }).then(res => {
                resolve(res)
            })
            .catch((err)=>{
                console.log(err)
                reject('gagal menampilkan data')
            })
        })
    }

    soldOut(){
        return new Promise((resolve, reject)=>{
            this.table
            .findAll({
                order: [['updatedAt', 'DESC']],
                where: { inventori_stok: 0 }
            }).then(res => {
                resolve(res)
            })
            .catch((err)=>{
                console.log(err)
                reject('gagal menampilkan data')
            })
        })
    }

}


module.exports = new Inventories