const { DataTypes } = require("sequelize");
const db = require("../config/db");

const productionNoteModel = db.define("productionNote", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    responsible: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        freezeTableName: true,
    }    
);

module.exports = productionNoteModel;