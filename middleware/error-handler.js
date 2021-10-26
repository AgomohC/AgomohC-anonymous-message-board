const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };

  // handles mongoose validation errors. for more info, see https://mongoosejs.com/docs/api/error.html#error_Error-ValidationError
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = 400;
  }

  return res.status(customError.statusCode).json({ error: customError.msg });
};

module.exports = errorHandlerMiddleware;
