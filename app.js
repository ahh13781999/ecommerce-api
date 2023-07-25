require("dotenv").config();
require("express-async-errors");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimiter = require("express-rate-limit");
const xss = require("xss-clean");
const cors = require("cors");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const orderRouter = require("./routes/orderRoutes");

const connectDB = require("./db/connectDB");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const notFoundMiddleware = require("./middleware/notFound");

const express = require("express");
const app = express();

// MIDDLEARE
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(express.static("./public"));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileUpload());

// ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);

// MIDDLEWARE
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// PORT
const port = process.env.PORT || 3000;

const Start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`The server is listening on port ${port}`));
  } catch (error) {
    console.log(error.message);
  }
};

Start();
