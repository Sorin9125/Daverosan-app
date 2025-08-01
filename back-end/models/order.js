const { DataTypes } = require("sequelize");
const db = require("../config/db");

const orderModel = db.define("order", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    number: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    remainingQuantity: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    unit: {
        type: DataTypes.ENUM("buc", "kg"),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(5000),
        allowNull: false,
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
    },
},
    {
        freezeTableName: true,
    }
);

module.exports = orderModel;