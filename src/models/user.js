const { DataTypes, Model } = require('sequelize')
const db = require('../db')

const tableOptions = {
    sequelize: db,
    modelName: 'users'
}

const tableColumns = {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}

class thisTable extends Model {}
thisTable.init(tableColumns, tableOptions)
module.exports = thisTable