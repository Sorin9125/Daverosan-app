const { DataTypes } = require('sequelize');
const db = require("../config/db");

const requestModel = db.define("request", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        sentAt : {
            type: DataTypes.DATE,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(5000),
            allowNull: false,
        },
        isOfferd: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
},
    {
        freezeTableName: true,
    }
);

module.exports = requestModel;