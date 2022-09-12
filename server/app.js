const express = require("express");
// Global Error Handling
const errorController = require("./controllers/errorController");
const AppError = require("./utils/appError");
const cors = require("cors");
// Routers
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRoutar");
const cartRouter = require("./routes/cartRouter");
const authMiddleware = require("./middlewares/authMiddleware");
// Create Express App
const app = express();

// Middillwares
app.use(express.json());
app.use(cors());
// Routes
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/carts", authMiddleware, cartRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Path ${req.path} not exists`, 404));
});

app.use(errorController);

module.exports = app;
