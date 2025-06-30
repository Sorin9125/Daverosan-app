const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const productCategoriesModel = db.define("productCategories",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    },
    {
        freezeTableName: true,
    }
);

module.exports = productCategoriesModel;