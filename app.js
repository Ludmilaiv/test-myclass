const express = require("express");
const mainRouter = require("./routes/main-router");

const app = express();

app.use(express.json());

app.use("/", mainRouter);

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(error.status || 500)
    .json({ status: error.status, message: error.message })
})


module.exports = app;