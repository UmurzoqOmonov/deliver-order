const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/db/db");
const orderStatus = require("../utils/constants/orderStatuses");
const OrderItem = require("./OrderItem");
const Payment = require("./Payment");

const Order = sequelize.define(
  "orders",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(Object.values(orderStatus)),
      allowNull: false,
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

Order.hasOne(Payment)
Payment.belongsTo(Order, { as: "order" });

Order.hasMany(OrderItem, { as: "items" });
OrderItem.belongsTo(Order, { as: "order" });

module.exports = Order;
