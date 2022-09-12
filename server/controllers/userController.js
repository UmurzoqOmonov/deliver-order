const User = require("../models/User");
const { validationResult } = require("express-validator");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

exports.register = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }

  const exsistedUser = await User.findOne({
    where: { username: { [Op.eq]: req.body.username } },
  });

  if (exsistedUser) {
    return next(new AppError("Bunday loginli foydalanuvchi mavjud", 409));
  }

  const createUser = await User.create(req.body);
  console.log(createUser);
  res.status(201).json({
    status: "success",
    message: "created user",
    errors: null,
    data: {
      createdUser: {
        id: createUser.id,
        firstName: createUser.firstName,
        lastName: createUser.lastName,
        role: createUser.role,
      },
    },
  });
});

exports.getAllUser = catchAsync(async (req, res, next) => {
  const allUsers = await User.findAll();
  res.json({
    status: "success",
    message: "get all users",
    errors: null,
    data: { allUsers },
  });
});

exports.getByIdUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const byId = await User.findByPk(id);
  if (!byId) {
    return next(
      new AppError(`Bunday ${id} ID li foydalanuvchi topilmadi`, 404)
    );
  }
  res.json({
    status: "success",
    message: "get by Id user",
    errors: null,
    data: { byId },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const createdUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    message: "created user",
    errors: null,
    data: { createdUser },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const { id } = req.params;
  const byId = await User.findByPk(id);
  if (!byId) {
    return next(
      new AppError(`Bunday ${id} ID li foydalanuvchi topilmadi`, 404)
    );
  }
  const updatedUser = await byId.update(req.body);
  res.json({
    status: "success",
    message: "updated product",
    errors: null,
    data: { updatedUser },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const byId = await User.findByPk(id);
  if (!byId) {
    return next(
      new AppError(`Bunday ${id} ID li foydalanuvchi topilmadi`, 404)
    );
  }
  await byId.destroy();

  res.json({
    status: "success",
    message: "deleted product",
    errors: null,
    data: { data: null },
  });
});
