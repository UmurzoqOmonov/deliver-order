const { DataTypes } = require("sequelize");
const sequelize = require("../config/db/db");
const CartItem = require("./CartItem");

const Cart = sequelize.define(
  "carts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    underscored: true,
  }
);

Cart.hasMany(CartItem, { as: "items" });
CartItem.belongsTo(Cart, { as: "cart" });

module.exports = Cart;
