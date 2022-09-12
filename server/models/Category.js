const { DataTypes } = require("sequelize");
const sequelize = require("../config/db/db");
const Product = require("./Product");

const Category = sequelize.define(
  "categories",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    underscored: true,
  }
);

Category.hasMany(Product, { as: "products" });
Product.belongsTo(Category, { as: "category", onDelete: "restrict" });

module.exports = Category;
