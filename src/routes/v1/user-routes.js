const express = require("express");

const router = express.Router();

const { UserController } = require("../../controllers");
const { UserMiddlewares } = require("../../middlewares");

router.post(
  "/signup",
  UserMiddlewares.validateSignUpRequest,
  UserController.signUp
);

router.post("/signin", UserController.signIn);

module.exports = router;
