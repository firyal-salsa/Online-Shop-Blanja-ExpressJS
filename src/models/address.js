const {orm} = require("../configs/db")
const {DataTypes} = require("sequelize")
const customers = require("./customers")

class Address {
    constructor() {
        this.table = orm.define("address", {
            address_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            address_tempat: {
                type: DataTypes.STRING(15),
                allowNull: false,
            },
            address_nama: {
                type: DataTypes.STRING(35),
                allowNull: false,
            },
            address_telepon: {
                type: DataTypes.INTEGER(255),
                allowNull: false,
            },
            address_alamat: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            address_kodepos: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            address_kota: {
                type: DataTypes.STRING(15),
                allowNull: false,
            },
            address_email: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: "customers",
                    key: "email",
                },
            },
        })
        this.table.belongsTo(customers.table,{
            foreignKey: "address_email",
            as: "customers",
        })
    }

    SaveAdress(data) {
        return new Promise((resolve, reject) => {
            this.table.create(data)
            .then(res => {
                resolve(res.toJSON())
            }).catch((err)=>{
                reject('salah memasukan data')
            })
        })
    }

    getAllAdress(){
        return new Promise((resolve, reject)=>{
            this.table
            .findAll({
                include: [{ model: customers.table, as: "customers" }],
                order: [['updatedAt', 'DESC']],
            }).then(res => {
                resolve(res)
            })
            .catch((err)=>{
                reject('gagal menampilkan tabel alamat')
            })
        })
    }

    DeleteAddress(address_id) {
        return new Promise((resolve, reject) => {
            this.table.destroy({ where: { address_id } })
            .then(res => {
                resolve("berhasil menghapus data alamat")
            }).catch((err)=>{
                reject('gagal menghapus data alamat')
            })
        })
    }

    
}


module.exports = new Address