const { Op } = require("sequelize");
const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.addItem = catchAsync(async (req, res, next) => {
  const { productId, amount } = req.body;
  const cart = await Cart.findOne({
    where: { customerId: { [Op.eq]: req.user.id } },
    include: ["items"],
  });
  console.log(cart.items);
  const existedItem = await cart.items.find((i) => i.id === productId);
  const product = await Product.findByPk(productId);
  if (existedItem) {
    await CartItem.update(
      {
        amount: existedItem.amount + amount,
        totalPrice: existedItem.totalPrice + product.price * amount,
      },
      { where: { cartId: { [Op.eq]: existedItem.id } } }
    );
  } else {
    await CartItem.create({
      amount,
      productId,
      cartId: cart.id,
      totalPrice: product.price,
    });
  }
  res.status(200).json({
    status: "success",
    message: "Mahsulot savatga qo'shildi",
    errors: null,
    data: null,
  });
});

exports.getItems = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({
    where: { customerId: { [Op.eq]: req.user.id } },
  });

  const items = await CartItem.findAll({
    where: { cartId: { [Op.eq]: cart.id } },
  });

  res.json({
    status: "success",
    message: "",
    error: null,
    data: { items },
  });
});
