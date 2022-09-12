const { DataTypes } = require("sequelize");
const sequelize = require("../config/db/db");
const Product = require("./Product");

const OrderItem = sequelize.define(
  "orderItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

Product.hasOne(OrderItem);
OrderItem.belongsTo(Product, { as: "product" });

module.exports = OrderItem;
