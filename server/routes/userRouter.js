const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const userController = require("../controllers/userController");

// router.route("/register").post(userController.register);

router.route("/").get(userController.getAllUser);
router.delete("/:id", userController.deleteUser);
//   .put(
//     body("firstName")
//       .notEmpty()
//       .withMessage("Ism bo'sh bo'lishi mumkin emas")
//       .isLength({ min: 3 })
//       .withMessage("Ism eng kamida 3 ta belgidan iborat bo'lishi kerak"),
//     body("username")
//       .notEmpty()
//       .withMessage("Login bo'sh bo'lmasligi kerak")
//       .isLength({ min: 5 })
//       .withMessage("Login kamida 5 ta belgidan iborat bo'lishi kerak"),
//     body("password")
//       .notEmpty()
//       .withMessage("Parol bo'sh bo'lishi mumkin emas")
//       .isLength({ min: 6 })
//       .withMessage("Parol kamida 6 ta belgidan iborat bo'lishi kerak"),
//     body("role")
//       .notEmpty()
//       .withMessage("Foydalanuvchining statusi bo'sh bo'lmasligi kerak")
//       .isLength({ min: 5 })
//       .withMessage(
//         "Foydalanuvchi statusi kamida 5 ta belgidan iborat bo'lishi kerak"
//       ),
//     userController.updateUser
//   )

module.exports = router;
