const { DataTypes } = require("sequelize");
const db = require("../config/db");

const productionNoteModel = db.define("productionNote", {
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
    },
    scheme: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    weight: {
        type: DataTypes.INTEGER,
    },
    isFinished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
},
    {
        tableName: "production-note",
        freezeTableName: true,
    }
);

module.exports = productionNoteModel;