const { DataTypes } = require("sequelize");
const db = require("../config/db");

const clientModel = db.define("client", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        freezeTableName: true,
    }
);

module.exports = clientModel;
