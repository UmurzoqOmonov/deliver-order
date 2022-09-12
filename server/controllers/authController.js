const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const User = require("../models/User");
const Cart = require("../models/Cart");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { compare } = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");

const findByUsername = async (username) => {
  const candidate = await User.findOne({
    where: { username: { [Op.eq]: username } },
  });

  if (candidate) {
    return candidate;
  } else {
    return null;
  }
};

const generateToken = (payload, jwtSecret, options) => {
  return new Promise((resolve, reject) => {
    jsonWebToken.sign(payload, jwtSecret, options, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }

  const exsistedUser = await findByUsername(req.body.username);

  if (exsistedUser) {
    return next(new AppError("Bunday loginli foydalanuvchi mavjud", 409));
  }

  const createUser = await User.create(req.body);
  await Cart.create({ customerId: createUser.id });
  const payload = {
    id: createUser.id,
    firstName: createUser.firstName,
    lastName: createUser.lastName,
    role: createUser.role,
  };

  const options = {
    algorithm: "HS512",
    expiresIn: "24h",
  };
  const token = await generateToken(payload, process.env.JWT_SECRET, options);
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
        jwt: token,
      },
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const { password, username } = req.body;

  const candidate = await findByUsername(username);
  if (!candidate) {
    return next(new AppError("Login yoki Parol xato kiritildi", 400));
  }

  const passwordIsMatch = await compare(password, candidate.password);

  if (!passwordIsMatch) {
    return next(new AppError("Login yoki Parol xato kiritildi", 400));
  }

  const payload = {
    id: candidate.id,
    firstName: candidate.firstName,
    lastName: candidate.lastName,
    role: candidate.role,
  };

  const options = {
    algorithm: "HS512",
    expiresIn: "24h",
  };

  const token = await generateToken(payload, process.env.JWT_SECRET, options);

  res.json({
    status: "success",
    message: "",
    errors: null,
    data: {
      user: {
        ...payload,
        jwt: token,
      },
    },
  });
});
