const express = require("express");

const router = express.Router();

const { InfoController } = require("../../controllers");

router.get("/info", InfoController);

module.exports = router;
