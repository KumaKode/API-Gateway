const express = require("express");
const { ServerConfig, LoggerConfig } = require("./config");
const Routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", Routes);

app.listen(ServerConfig.PORT, () => {
  console.log("Successfully started the server");
  LoggerConfig.info("Successfully started the server");
});
