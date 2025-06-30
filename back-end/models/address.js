const { DataTypes, DATE } = require("sequelize");
const db = require("../config/db.js");

const addressModel = db.define("address", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zipCode: {
            type: DataTypes.BIGINT,
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
    }
);

module.exports = addressModel;