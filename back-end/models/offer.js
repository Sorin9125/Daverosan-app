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
    price: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    isAccepted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
},
    {
        freezeTableName: true,
    }
);

module.exports = offerModel;