const { DataTypes } = require("sequelize");
const db = require("../config/db");

const clientModel = db.define("client", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mail: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    site: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        freezeTableName: true,
    }
);

module.exports = clientModel;
