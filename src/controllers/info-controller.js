const { StatusCodes } = require("http-status-codes");

async function getInfo(req, res) {
  return res.status(StatusCodes.OK).json({
    success: true,
    message: "API is Live",
    data: {},
    error: {},
  });
}

module.exports = getInfo;
