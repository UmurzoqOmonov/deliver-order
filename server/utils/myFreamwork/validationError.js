const AppError = require("../appError");
const { validationResult } = require("express-validator");

const validationError = (req) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.name = "validationError";
    err.errors = validation.errors;
    err.isOperational = false;
    return err;
  }
};

module.exports = validationError;
