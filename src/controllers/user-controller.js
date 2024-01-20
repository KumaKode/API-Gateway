const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function signUp(req, res) {
  try {
    const user = await UserService.signUp({
      email: req.body.email,
      password: req.body.password,
    });

    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).send(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ErrorResponse);
  }
}

async function signIn(req, res) {
  try {
    const response = await UserService.signIn({
      email: req.body.email,
      password: req.body.password,
    });

    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).send(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ErrorResponse);
  }
}

async function getUser(req, res) {
  try {
    const user = await UserService.getUser(req.params.id);
    SuccessResponse.data = user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function addRoleToUser(req, res) {
  try {
    const response = await UserService.addRoleToUser({
      id: req.body.id,
      role: req.body.role,
    });

    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).send(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ErrorResponse);
  }
}

module.exports = {
  signUp,
  signIn,
  getUser,
  addRoleToUser,
};
