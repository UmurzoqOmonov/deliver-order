const Product = require("../models/Product");
const { validationResult } = require("express-validator");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const pagenation = require("../utils/myFreamwork/pagination");

exports.getAllProduct = catchAsync(async (req, res, next) => {
  const allTable = await pagenation(req.query, Product, { page: 1, size: 5 });

  res.json({
    status: "success",
    message: "get all products",
    errors: null,
    data: { allProduts: { ...allTable } },
  });
});

exports.getByIdProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const byId = await Product.findByPk(id);
  if (!byId) {
    return next(new AppError(`Bunday ${id} ID li maxsulot topilmadi`, 404));
  }
  res.json({
    status: "success",
    message: "get by Id product",
    errors: null,
    data: { byId },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const createdProduct = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    message: "created product",
    errors: null,
    data: { createdProduct },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const { id } = req.params;
  const byId = await Product.findByPk(id);
  if (!byId) {
    return next(new AppError(`Bunday ${id} ID li maxsulot topilmadi`, 404));
  }
  const updatedProduct = await byId.update(req.body);
  res.json({
    status: "success",
    message: "updated product",
    errors: null,
    data: { updatedProduct },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const byId = await Product.findByPk(id);
  if (!byId) {
    return next(new AppError(`Bunday ${id} ID li maxsulot topilmadi`, 404));
  }
  await byId.destroy();

  res.json({
    status: "success",
    message: "deleted product",
    errors: null,
    data: null,
  });
});
