const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(authMiddleware, productController.getAllProduct)
  .post(
    authMiddleware,
    body("name")
      .notEmpty()
      .withMessage("Mahsulot nomi bo'sh bo'lishi mumkin emas")
      .isLength({ min: 3 })
      .withMessage("Mahsulot nomi kamida 3 ta belgidan iborat bo'lishi kerak"),
    body("price")
      .notEmpty()
      .withMessage("Mahsulot narxi bo'sh bo'lishi mumkin emas")
      .isInt({ min: 100 })
      .withMessage(
        "Mahsulot narxi eng kamida 3 ta belgidan iborat bo'lishi kerak"
      ),
    body("categoryId")
      .notEmpty()
      .withMessage(
        "Mahsulotning qaysi Categoriyaga tegishliligi bo'sh bo'lmasligi kerak"
      ),
    productController.createProduct
  );

router
  .route("/:id")
  .get(authMiddleware, productController.getByIdProduct)
  .put(
    authMiddleware,
    body("name")
      .notEmpty()
      .withMessage("Mahsulot nomi bo'sh bo'lishi mumkin emas")
      .isLength({ min: 3 })
      .withMessage("Mahsulot nomi kamida 3 ta belgidan iborat bo'lishi kerak"),
    body("price")
      .notEmpty()
      .withMessage("Mahsulot narxi bo'sh bo'lishi mumkin emas")
      .isInt({ min: 100 })
      .withMessage(
        "Mahsulot narxi eng kamida 3 ta belgidan iborat bo'lishi kerak"
      ),
    body("categoryId")
      .notEmpty()
      .withMessage(
        "Mahsulotning qaysi Categoriyaga tegishliligi bo'sh bo'lmasligi kerak"
      ),
    productController.updateProduct
  )
  .delete(authMiddleware, productController.deleteProduct);

module.exports = router;
