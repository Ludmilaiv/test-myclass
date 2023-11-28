const express = require("express");
const mainRouter = require("./routes/main-router");

const app = express();

app.use("/", mainRouter);


module.exports = app;