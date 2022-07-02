require("dotenv").config();
const express = require("express");
const helmet = require("helmet");

const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");

app.use(express.json());
app.use(helmet());

app.use(morgan("common"));
// middleware to log HTTP requests and errors, and simplifies the process. In Node.js and Express,

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

//Connect to DB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => {
    console.log("DB Error.");
  });

//Listen To port
app.listen(8080);
//Import Routes
// const productRouter = require("./routes/productRouter");

// app.use(productRouter);

//Not found MW
app.use((request, response) => {
  response.status(404).json({ data: "Not Found" });
});

//Error MW
app.use((error, request, response, next) => {
  //JS  code function.length
  let status = error.status || 500;
  response.status(status).json({ Error: error + "" });
});
