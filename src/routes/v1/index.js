const express = require("express");

const router = express.Router();

const { InfoController } = require("../../controllers");
const { UserMiddlewares } = require("../../middlewares");
const userRoutes = require("./user-routes");

router.get("/info", UserMiddlewares.chekAuth, InfoController);
router.use("/users", userRoutes);

module.exports = router;
