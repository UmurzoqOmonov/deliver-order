const Category = require("../models/Category");
const { validationResult } = require("express-validator");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const pagenation = require("../utils/myFreamwork/pagination");

exports.getAllCategory = catchAsync(async (req, res, next) => {
  const allTable = await pagenation(req.query, Category, { page: 1, size: 5 });

  res.json({
    status: "success",
    message: "get all categories",
    errors: null,
    data: { allCategories: { ...allTable } },
  });
});

exports.getByIdCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const byId = await Category.findByPk(id);
  if (!byId) {
    return next(new AppError(`Bunday ${id} ID li categoriya topilmadi`));
  }
  res.json({
    status: "success",
    message: "get by Id categories",
    errors: null,
    data: { byId },
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }

  const createdCategory = await Category.create(req.body);
  res.status(201).json({
    status: "success",
    message: "created categories",
    errors: null,
    data: { createdCategory },
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const { id } = req.params;
  const byId = await Category.findByPk(id);
  if (!byId) {
    return next(new AppError(`Bunday ${id} ID li categoriya topilmadi`));
  }
  const updatedCategory = await byId.update({ ...req.body });
  res.json({
    status: "success",
    message: "updated categories",
    errors: null,
    data: { updatedCategory },
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const byId = await Category.findByPk(id);
  if (!byId) {
    return next(new AppError(`Bunday ${id} ID li categoriya topilmadi`));
  }
  await byId.destroy(byId);
  res.json({
    status: "success",
    message: "deleted categories",
    errors: null,
    data: null,
  });
});
