require("dotenv").config();
const db = require("./config/db/db");
const app = require("./app");
const Attachment = require("./models/Attachment");
const Cart = require("./models/Cart");
const CartItem = require("./models/CartItem");
const Category = require("./models/Category");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");
const Payment = require("./models/Payment");
const Product = require("./models/Product");
const User = require("./models/User");
const PORT = process.env.PORT || 1571;
const NODE_ENV = process.env.NODE_ENV;

db.authenticate()
  .then(() => {
    console.log("Database connected");
    db.sync();
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server ${NODE_ENV} started on PORT ${PORT}`);
});
