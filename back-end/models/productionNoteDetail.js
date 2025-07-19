const { DataTypes } = require("sequelize");
const db = require("../config/db");

const productionNoteDetailModel = db.define("productionNoteDetail", {
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
    pieces: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    stage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        freezeTableName: true,
    }
);

module.exports = productionNoteDetailModel;