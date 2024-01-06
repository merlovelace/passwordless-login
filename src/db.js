const { Sequelize } = require('sequelize')

const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

const options = {
    dialect: 'postgresql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    encrypt: false,
    logging: false,
}

module.exports = new Sequelize(dbName, dbUser, dbPass, options)