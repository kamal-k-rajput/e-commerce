const express = require("express");
const app = express();
app.use(express.json());
//route import
const errorMiddleware = require("./middlewares/error");
const product = require("./routes/productRoute");

app.use("/api/v1", product);

// middleware for errors and

app.use(errorMiddleware);
module.exports = app;
