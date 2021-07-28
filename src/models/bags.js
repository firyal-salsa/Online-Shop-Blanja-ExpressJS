const {orm} = require("../configs/db")
const {DataTypes} = require("sequelize")
const products = require("./products")

class Bags {
    constructor() {
        this.table =  orm.define("bags", {
            bag_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            bag_jumlah: {
                type: DataTypes.INTEGER(3),
                allowNull: false,
            },
            bag_produk_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "products",
                    key: "produk_id"
                },
            },
        })
        this.table.belongsTo(products.table,{
            foreignKey: "bag_produk_id",
            as: "products",
        })
    }

    Save(data) {
        return new Promise((resolve, reject) => {
            this.table.create(data)
            .then(res => {
                resolve(res.toJSON())
            }).catch((err)=>{
                reject('gagal memasukan data')
            })
        })
    }

    getAll(){
        return new Promise((resolve, reject)=>{
            this.table
            .findAll({
                include: [{ model: products.table, as: "products" }],
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

    Update(bag_id, data) {
        return new Promise((resolve, reject) => {
            this.table.update({
                bag_jumlah : data.bag_jumlah,
                bag_produk_id: data.bag_produk_id
              }, {
                where: {
                    bag_id: bag_id
                }
              })
            .then(res => {
                resolve(res.toJSON())
            }).catch((err)=>{
                console.log(err)
                reject('salah memasukan data')
            })
        })
    }

    Delete(bag_id) {
        return new Promise((resolve, reject) => {
            this.table.destroy({ where: { bag_id } })
            .then(res => {
                resolve("berhasil menghapus data keranjang")
            }).catch((err)=>{
                reject("salah memasukan data")
            })
        })
    }

}

module.exports = new Bags