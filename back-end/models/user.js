const db = require("../config/db.js");
const { DataTypes } = require("sequelize");

const userModel = db.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
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
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    resetToken: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    verificationCode: {
        type: DataTypes.INTEGER,
    }
},
    {
        freezeTableName: true,
    }
);

module.exports = userModel;