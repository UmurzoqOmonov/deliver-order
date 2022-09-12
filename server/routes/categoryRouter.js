const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router
  .route("/")
  .get(categoryController.getAllCategory)
  .post(
    body("name")
      .notEmpty()
      .withMessage("Categoryiyani nomi bo'sh bolishi mumkin emas")
      .isLength({ min: 3 })
      .withMessage("Categoriyani nomi 3 ta belgidan kam bo'lmasligi kerak"),
    categoryController.createCategory
  );

router
  .route("/:id")
  .get(categoryController.getByIdCategory)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
