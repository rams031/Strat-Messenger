const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const jwt = require('jsonwebtoken');
const db = require("./db/db");
const errorHandler = require("./errorHandler");
const app = express();
const port = 5000;

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(db, {});
 
process.on("uncaughtException", function (error) {
  console.log(error.stack);
});

const UserRouter = require("./routes/user/user");
const RoomRouter = require("./routes/room/room");

app.use("/user/", UserRouter);
app.use("/room/", RoomRouter);

app.get("/", (req, res) => {
  res.send("Server Working");
});

app.use(errorHandler);

app.listen(port, (res, req) => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log(mongoose.connection.readyState);
});
