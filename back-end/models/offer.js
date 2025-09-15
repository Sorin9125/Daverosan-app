const { DataTypes } = require("sequelize");
const db = require("../config/db");

const offerModel = db.define("offer", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    value: {
        type: DataTypes.DECIMAL(10, 5),
        allowNull: false,
    },
    unit: {
        type: DataTypes.ENUM("buc", "kg"),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(5000),
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM("total", "unit"),
        allowNull: false,
    },
    number: {
        type: DataTypes.STRING(5000),
        allowNull: false,
        defaultValue: ""
    },
    isAccepted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
},
    {
        freezeTableName: true,
    }
);

module.exports = offerModel;