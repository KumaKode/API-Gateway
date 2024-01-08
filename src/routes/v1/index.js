const express = require("express");

const router = express.Router();

const { InfoController } = require("../../controllers");
const userRoutes = require("./user-routes");

router.get("/info", InfoController);
router.use("/users", userRoutes);

module.exports = router;
