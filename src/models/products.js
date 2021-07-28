const {orm} = require("../configs/db")
const {DataTypes} = require("sequelize")
const categories = require("./categories")
const sellers = require("./sellers")

class Products {
    constructor() {
        this.table = orm.define("products", {
            produk_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            produk_nama: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            produk_toko: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            produk_harga: {
                type: DataTypes.FLOAT(5),
                allowNull: false,
            },
            produk_terjual: {
                type: DataTypes.INTEGER(13),
                allowNull: false,
            },
            produk_foto: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            produk_kategori_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "categories",
                    key: "kategori_id",
                },
            },
            produk_seller: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: "sellers",
                    key: "email",
                },
            },
        })
        this.table.belongsTo(categories.table,{
            foreignKey: "produk_kategori_id",
            as: "categories",
        }),
        this.table.belongsTo(sellers.table,{
            foreignKey: "produk_seller",
            as: "sellers",
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
                include: [{ model: categories.table, as: "categories" },{ model: sellers.table, as: "sellers" }],
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

    Delete(produk_id) {
        return new Promise((resolve, reject) => {
            this.table.destroy({ where: { produk_id } })
            .then(res => {
                resolve("berhasil menghapus data produk")
            }).catch((err)=>{
                reject('gagal menghapus data produk')
            })
        })
    }

    sortByName(produk_nama){
        return new Promise((resolve, reject)=>{
            this.table
            .findAll({
                include: [{ model: categories.table, as: "categories" }],
                order: [['produk_nama']],
            }).then(res => {
                resolve(res)
            })
            .catch((err)=>{
                console.log(err)
                reject('gagal menampilkan data')
            })
        })
    }

    sortByCategory(kategori_nama){
        return new Promise((resolve, reject)=>{
            this.table
            .findAll({
                include: [{ model: categories.table, as: "categories" }],
                order: [['kategori_nama']],
            }).then(res => {
                resolve(res)
            })
            .catch((err)=>{
                console.log(err)
                reject('gagal menampilkan data')
            })
        })
    }

    sortByPrice(produk_harga){
        return new Promise((resolve, reject)=>{
            this.table
            .findAll({
                include: [{ model: categories.table, as: "categories" }],
                order: [['produk_harga']],
            }).then(res => {
                resolve(res)
            })
            .catch((err)=>{
                console.log(err)
                reject('gagal menampilkan data')
            })
        })
    }

    Update(produk_id, data) {
        return new Promise((resolve, reject) => {
            this.table.update({
                produk_nama : data.produk_nama,
                produk_toko: data.produk_toko,
                produk_harga : data.produk_harga,
                produk_terjual : data.produk_terjual,
                produk_foto : data.produk_foto,
                produk_kategori_id: data.produk_kategori_id
              }, {
                where: {
                    produk_id: produk_id
                }
              })
            .then(res => {
                resolve(`Berhasil mengubah data id ke ${produk_id}`)
            }).catch((err)=>{
                console.log(err)
                reject('gagal mengubah data')
            })
        })
    }

}


module.exports = new Products