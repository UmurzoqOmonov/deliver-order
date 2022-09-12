const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/db/db");
const roles = require("../utils/constants/roles");
const Cart = require("./Cart");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [5],
          msg: "Login kamida 5 ta belgidan iborat bo'lishi kerak",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
        },
      },
    },
    role: {
      type: DataTypes.ENUM(Object.values(roles)),
      allowNull: false,
      defaultValue: roles.ROLE_CUSTOMER,
    },
  },
  {
    underscored: true,
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 8);
      },
    },
  }
);

User.hasOne(Cart, { as: "cart", foreignKey: "customer_id" });
Cart.belongsTo(User, { as: "customer" });

module.exports = User;
