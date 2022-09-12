const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authController = require("../controllers/authController");

router.post(
  "/login",

  body("username")
    .notEmpty()
    .withMessage("Login bo'sh bo'lmasligi kerak")
    .isLength({ min: 5 })
    .withMessage("Login kamida 5 ta belgidan iborat bo'lishi kerak"),
  body("password")
    .notEmpty()
    .withMessage("Parol bo'sh bo'lishi mumkin emas")
    .isLength({ min: 6 })
    .withMessage("Parol kamida 6 ta belgidan iborat bo'lishi kerak"),

  authController.login
);
router.post(
  "/register",
  body("firstName")
    .notEmpty()
    .withMessage("Ism bo'sh bo'lishi mumkin emas")
    .isLength({ min: 3 })
    .withMessage("Ism eng kamida 3 ta belgidan iborat bo'lishi kerak"),
  body("username")
    .notEmpty()
    .withMessage("Login bo'sh bo'lmasligi kerak")
    .isLength({ min: 5 })
    .withMessage("Login kamida 5 ta belgidan iborat bo'lishi kerak"),
  body("password")
    .notEmpty()
    .withMessage("Parol bo'sh bo'lishi mumkin emas")
    .isLength({ min: 6 })
    .withMessage("Parol kamida 6 ta belgidan iborat bo'lishi kerak"),
  authController.register
);

module.exports = router;
