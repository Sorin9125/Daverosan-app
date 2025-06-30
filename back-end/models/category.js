const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const categoryModel = db.define("category", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);

module.exports = categoryModel;