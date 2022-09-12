const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/items", cartController.addItem);
router.get("/items", cartController.getItems);

module.exports = router;
