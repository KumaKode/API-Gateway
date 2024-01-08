const express = require("express");

const router = express.Router();

const { UserController } = require("../../controllers");
const { UserMiddlewares } = require("../../middlewares");

router.post(
  "/signup",
  UserMiddlewares.validateAuthRequest,
  UserController.signUp
);

router.post(
  "/signin",
  UserMiddlewares.validateAuthRequest,
  UserController.signIn
);

module.exports = router;
