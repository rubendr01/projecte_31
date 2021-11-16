const express = require("express");
const app = express();

app.use(require("./users")),
  app.use(require("./clients")),
  app.use(require("./serveis"));
//app.use(require("./login"));

module.exports = app;
