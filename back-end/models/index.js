const db = require("../config/db.js");
const userModel = require("./user.js");
const requestModel = require("./request.js");
const clientModel = require("./client.js");
const offerModel = require("./offer.js");
const orderModel = require("./order.js");
const productionNoteModel = require("./productionNote.js");
const productionNoteDetailModel = require("./productionNoteDetail.js");

clientModel.hasMany(requestModel);
requestModel.belongsTo(clientModel);

requestModel.hasOne(offerModel);
offerModel.belongsTo(requestModel);

offerModel.hasOne(orderModel);
orderModel.belongsTo(offerModel);

orderModel.hasOne(productionNoteModel);
productionNoteModel.belongsTo(orderModel);

productionNoteModel.hasMany(productionNoteDetailModel);
productionNoteDetailModel.belongsTo(productionNoteModel);

module.exports = {
    db,
    userModel,
    requestModel,
    clientModel,
    offerModel,
    orderModel,
    productionNoteModel,
    productionNoteDetailModel,
};