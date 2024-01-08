const express = require("express");

const router = express.Router();

const { UserController } = require("../../controllers");
const { UserMiddlewares } = require("../../middlewares");

router.post(
  "/",
  UserMiddlewares.validateCreateUserRequest,
  UserController.signUp
);

module.exports = router;
