const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const orderModel = db.define("order", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        total: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
    }
);

module.exports = orderModel;