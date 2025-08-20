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