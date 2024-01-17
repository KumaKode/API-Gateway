const express = require("express");
const ratelimit = require("express-rate-limit");

const {
  createProxyMiddleware,
  fixRequestBody,
} = require("http-proxy-middleware");

const { ServerConfig, LoggerConfig } = require("./config");
const Routes = require("./routes");

const { UserMiddlewares } = require("./middlewares");

const app = express();
const limiter = ratelimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.use(
  "/flightService",
  [
    UserMiddlewares.chekAuth,
    async function (req, res, next) {
      if (
        req.method === "POST" ||
        req.method === "PATCH" ||
        req.method === "DELETE"
      ) {
        UserMiddlewares.isFlightCompany(req, res, next);
      }
      next();
    },
  ],
  createProxyMiddleware({
    target: ServerConfig.FLIGHTS_SERVICE,
    changeOrigin: true,
    pathRewrite: {
      "^/flightService": "/", // rewrite path
    },
    onProxyReq: fixRequestBody,
  })
);

app.use(
  "/bookingService",
  [UserMiddlewares.chekAuth],
  createProxyMiddleware({
    target: ServerConfig.BOOKINGS_SERVICE,
    changeOrigin: true,
    pathRewrite: {
      "^/bookingService": "/", // rewrite path
    },
    onProxyReq: fixRequestBody,
  })
);

app.use("/api", Routes);

app.listen(ServerConfig.PORT, () => {
  console.log("Successfully started the server");
  LoggerConfig.info("Successfully started the server");
});
