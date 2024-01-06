const { DataTypes, Model } = require('sequelize')
const db = require('../db')

const tableOptions = {
    sequelize: db,
    modelName: 'magic'
}

const tableColumns = {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    email: {
        type: DataTypes.STRING
    },
    magicId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true
    },
    isSuccess: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isError: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    expired: {
        type: DataTypes.DATE
    }
}

class thisTable extends Model {}
thisTable.init(tableColumns, tableOptions)
module.exports = thisTable