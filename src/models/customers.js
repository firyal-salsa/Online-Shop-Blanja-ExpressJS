const {orm} = require("../configs/db")
const {DataTypes} = require("sequelize")

class Customers{
    constructor(){
        this.table = orm.define("customers", {
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
                allowNull: true,
            },
            gender: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            birthday: {
                type: DataTypes.DATEONLY,
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

    SaveCS(data) {
        return new Promise((resolve, reject) => {
            this.table.create(data)
            .then(res => {
                resolve(res.toJSON())
            }).catch((err)=>{
                reject('gagal memasukan data')
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
                reject('mohon input data login yang sesuai')
            })
        })
    }
    
    Update(email, data) {
        return new Promise((resolve, reject) => {
            this.table.update({
                name: data.name,
                email: data.email,
                phone_number: data.phone_number,
                gender: data.gender,
                birthday: data.birthday,
                foto: data.foto,
              }, {
                where: {
                    email : email
                }
              })
            .then(res => {
                resolve(`Berhasil mengubah data`)
            }).catch((err)=>{
                console.log(err)
                reject('ggagal mengubah data')
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
                reject('gagal mengubah password')
            })
        })
    }

}



module.exports = new Customers