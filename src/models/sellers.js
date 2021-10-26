const {orm} = require("../configs/db")
const {DataTypes} = require("sequelize")

class Seller{
    constructor(){
        this.table = orm.define("seller", {
            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            phone_number: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            store_name: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            store_description: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            foto: {
                type: DataTypes.STRING(255),
                allowNull: true,
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

    Update(email, data) {
        return new Promise((resolve, reject) => {
            this.table.update({
                name : data.name, 
                email : data.email, 
                phone_number : data.phone_number, 
                store_name : data.store_name,
                foto : data.foto,
                store_description: data.store_description
              }, {
                where: {
                    email : email
                }
              })
            .then(res => {
                resolve(`Berhasil mengubah data`)
            }).catch((err)=>{
                console.log(err)
                reject(err)
            })
        })
    }


    getEmail(email){
        return new Promise((resolve, reject)=>{
            this.table
            .findAll({where: { email } }).then(res => {
                resolve(res)
            })
            .catch((err)=>{
                reject('gagal menampilkan data')
            })
        })
    }

    resetPassword(email, data) {
        return new Promise((resolve, reject) => {
            this.table.update({
                password : data.password
              }, {
                where: {
                    email: email
                }
              })
            .then(res => {
                resolve(`Berhasil mengubah password ${email}`)
            }).catch((err)=>{
                console.log(err)
                reject('gagal mengubah data password')
            })
        })
    }
    
}




module.exports = new Seller