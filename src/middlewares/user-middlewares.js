const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateUserRequest(req, res, next) {
  ErrorResponse.message = "Something went wrong while creating user";
  if (!req.body.email) {
    ErrorResponse.error = new AppError(
      ["email not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
  }
  if (!req.body.password) {
    ErrorResponse.error = new AppError(
      ["password not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateUserRequest,
};
