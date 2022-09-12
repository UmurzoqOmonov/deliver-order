const { DataTypes } = require("sequelize");
const sequelize = require("../config/db/db");
const paymentTypes = require("../utils/constants/pays");

const Payment = sequelize.define(
  "payments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    paidSum: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(Object.values(paymentTypes)),
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

module.exports = Payment;
