const { DataTypes } = require("sequelize");
const db = require("../config/db");

const offerModel = db.define("offer", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    responsible: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    price: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    observation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        freezeTableName: true,
    }
);

module.exports = offerModel;