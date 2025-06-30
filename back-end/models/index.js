const { DataTypes } = require("sequelize");
const db = require("../config/db.js");
const userModel = require("./user.js");
const addressModel = require("./address.js");
const reviewModel = require("./review.js");
const productCategoriesModel = require("./productCategories.js");
const productModel = require("./product.js");
const categoryModel = require("./category.js");
const cartModel = require("./cart.js");
const orderModel = require("./order.js");

userModel.hasMany(addressModel);
addressModel.belongsTo(userModel);

reviewModel.hasOne(userModel);

cartModel.hasOne(userModel);
cartModel.hasMany(productModel);

userModel.hasMany(orderModel);
orderModel.belongsTo(userModel);

cartModel.hasOne(cartModel);

productModel.hasMany(reviewModel);

cartModel.hasMany(productModel);

productModel.belongsToMany(categoryModel, {through: productCategoriesModel});
categoryModel.belongsToMany(productModel, {through: productCategoriesModel});

module.exports = {
    db,
    userModel,
    addressModel,
    reviewModel,
    productCategoriesModel,
    productModel,
    categoryModel,
    cartModel,
    orderModel,
};