const sequelize = require("../config/db/db");
const { DataTypes } = require("sequelize");
const Attachment = require("./Attachment");

const Product = sequelize.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

Product.hasOne(Attachment, { as: "attachment" });
Attachment.belongsTo(Product, { onDelete: "cascade" });

module.exports = Product;
