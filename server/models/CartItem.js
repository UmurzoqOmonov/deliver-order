const { DataTypes } = require("sequelize");
const sequelize = require("../config/db/db");
const Product = require("./Product");

const CartItem = sequelize.define(
  "cartItems",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

Product.hasOne(CartItem, { as: "cartItem", foreignKey: "product_id" });
CartItem.belongsTo(Product, { as: "product" });

module.exports = CartItem;
