const { StatusCodes } = require("http-status-codes");

const { UserRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Auth } = require("../utils/common");

const userRepository = new UserRepository();

async function signUp(data) {
  try {
    const user = await userRepository.create(data);
    return user;
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      let explaination = [];
      error.errors.forEach((err) => {
        explaination.push(err.message);
      });
      throw new AppError(explaination, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Cannot create new user",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function signIn(data) {
  try {
    const user = await userRepository.getUserByEmail(data.email);
    if (!user) {
      throw new AppError("Not able to find the user", StatusCodes.NOT_FOUND);
    }
    const password = Auth.matchPassword(data.password, user.password);
    if (!password) {
      throw new AppError("Invalid password", StatusCodes.BAD_REQUEST);
    }
    const jwt = Auth.createToken({ id: user.id, email: user.email });
    return jwt;
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function isAuthenticated(token) {
  try {
    if (!token) {
      throw new AppError("No JWT token found", StatusCodes.BAD_REQUEST);
    }
    const response = Auth.verifyToken(token);
    const user = userRepository.get(response.id);
    if (!user) {
      throw new AppError("No user found", StatusCodes.BAD_REQUEST);
    }
    return user.id;
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) throw error;
    if (error.name === "JsonWebTokenError") {
      throw new AppError("Invalid JWT Token", StatusCodes.BAD_REQUEST);
    }
    if (error.name === "TokenExpiredError") {
      throw new AppError("JWT Token Expired", StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  signUp,
  signIn,
  isAuthenticated,
};
