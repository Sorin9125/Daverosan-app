const { DataTypes } = require('sequelize');
const db = require("../config/db");

const requestModel = db.define("request", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        registrationNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sentAt : {
            type: DataTypes.DATE,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
},
    {
        freezeTableName: true,
    }
);

module.exports = requestModel;