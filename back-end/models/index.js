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
const shoppingCartModel = require("./shoppingCart.js")

userModel.hasMany(reviewModel);
reviewModel.belongsTo(userModel);

userModel.hasMany(addressModel);
addressModel.belongsTo(userModel);

userModel.hasMany(orderModel);
orderModel.belongsTo(userModel);

userModel.hasOne(cartModel);

categoryModel.belongsToMany(productModel, {through: productCategoriesModel});
productModel.belongsToMany(categoryModel, {through: productCategoriesModel});

cartModel.belongsToMany(productModel, {through: shoppingCartModel});
productModel.belongsToMany(cartModel, {through: shoppingCartModel});

productModel.hasMany(reviewModel);
reviewModel.belongsTo(productModel);

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