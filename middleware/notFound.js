const { StatusCodes } = require("http-status-codes");

const NotFoundMiddleware = (req, res) =>
  res.status(StatusCodes.NOT_FOUND).send("The route doesn't exists");

module.exports = NotFoundMiddleware;