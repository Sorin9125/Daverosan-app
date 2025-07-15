const db = require("../config/db.js");
const { DataTypes } = require("sequelize");

const userModel = db.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull:false,
    },

},
    {
        freezeTableName: true,
    }
);

module.exports = userModel;