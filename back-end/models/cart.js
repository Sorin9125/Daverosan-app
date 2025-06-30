const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const cartModel = db.define("cart",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
    }
);

module.exports = cartModel;