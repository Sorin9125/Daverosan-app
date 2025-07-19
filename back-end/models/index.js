const db = require("../config/db.js");
const userModel = require("./user.js");
const offerRequestModel = require("./offerRequest.js");
const clientModel = require("./client.js");
const offerModel = require("./offer.js");
const orderModel = require("./order.js");
const productionNoteModel = require("./productionNote.js");
const productionNoteDetailModel = require("./productionNoteDetail.js");

clientModel.hasMany(offerRequestModel);
offerRequestModel.belongsTo(clientModel);

offerRequestModel.hasOne(offerModel);
offerModel.belongsTo(offerRequestModel);

offerModel.hasOne(orderModel);
orderModel.belongsTo(offerModel);

offerModel.hasOne(productionNoteModel);
productionNoteModel.belongsTo(offerModel);

productionNoteModel.hasMany(productionNoteDetailModel);
productionNoteDetailModel.belongsTo(productionNoteModel);

module.exports = {
    db,
    userModel,
    offerRequestModel,
    clientModel,
    offerModel,
    orderModel,
    productionNoteModel,
    productionNoteDetailModel,
};