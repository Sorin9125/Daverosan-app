const { DataTypes } = require("sequelize");
const db = require("../config/db");

const productionNoteModel = db.define("production-note", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    reper: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    port: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    scheme: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    pieces: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isFinished: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        freezeTableName: true,
    }
);

module.exports = productionNoteModel;