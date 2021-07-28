const {orm} = require("../configs/db")
const {DataTypes} = require("sequelize")

class Categories {
    constructor() {
        this.table = orm.define("categories", {
            kategori_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            kategori_nama: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
        })
    }

    getAll(){
        return new Promise((resolve, reject)=>{
            this.table
            .findAll({
                order: [['updatedAt', 'DESC']],
            }).then(res => {
                resolve(res)
            })
            .catch((err)=>{
                reject('gagal menampilkan data')
            })
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

    Update(kategori_id, data) {
        return new Promise((resolve, reject) => {
            this.table.update({
                kategori_nama : data.kategori_nama
              }, {
                where: {
                    kategori_id: kategori_id
                }
              })
            .then(res => {
                resolve(`Berhasil mengubah data id ke ${kategori_id}`)
            }).catch((err)=>{
                console.log(err)
                reject('gagal mengubah data kategori')
            })
        })
    }

    Delete(kategori_id) {
        return new Promise((resolve, reject) => {
            this.table.destroy({ where: { kategori_id } })
            .then(res => {
                resolve(`berhasil menghapus data kategori id ke ${kategori_id}`)
            }).catch((err)=>{
                reject("gagal menghapus data")
            })
        })
    }

}

module.exports = new Categories