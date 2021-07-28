const {Pool} = require("pg")
const {Sequelize} = require("sequelize")

const pool = new Pool({
    user: process.env.DB_USERS,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432
})

const orm = new Sequelize({
    username: process.env.DB_USERS,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432,
    dialect: "postgres",
})

module.exports = { pool, orm }