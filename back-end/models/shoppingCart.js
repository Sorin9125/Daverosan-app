const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const shoppingCartModel = db.define("shoppingCart", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        total: {
            type: DataTypes.BIGINT,
            allowNull: false, 
        }
    },
    {
        freezeTableName: true,
    }
);

module.exports = shoppingCartModel;