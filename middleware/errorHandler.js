const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let CustomError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later!",
  };

  if (err.name === "ValidationError") {
    CustomError.statusCode = StatusCodes.BAD_REQUEST;
    CustomError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }

  if (err.code && err.code === 11000) {
    CustomError.statusCode = StatusCodes.BAD_REQUEST;
    CustomError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
  }

  if (err.name === "CastError") {
    CustomError.statusCode = StatusCodes.NOT_FOUND;
    CustomError.msg = `No item found with id : ${err.value}`;
  }

  return res.status(CustomError.statusCode).json({ msg: CustomError.msg });
};

module.exports = errorHandlerMiddleware;