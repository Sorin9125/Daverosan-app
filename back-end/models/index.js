const db = require("../config/db.js");
const userModel = require("./user.js");
const requestModel = require("./request.js");
const clientModel = require("./client.js");
const offerModel = require("./offer.js");
const orderModel = require("./order.js");
const productionNoteModel = require("./productionNote.js");

clientModel.hasMany(requestModel);
requestModel.belongsTo(clientModel);

requestModel.hasOne(offerModel);
offerModel.belongsTo(requestModel);

offerModel.hasOne(orderModel);
orderModel.belongsTo(offerModel);

orderModel.hasMany(productionNoteModel, {
    onDelete: 'CASCADE',
});
productionNoteModel.belongsTo(orderModel);

module.exports = {
    db,
    userModel,
    requestModel,
    clientModel,
    offerModel,
    orderModel,
    productionNoteModel,
};