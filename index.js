const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const db = require("./db/db");
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(db, {});

const UserRouter = require('./routes/user/user')

app.use('/user/', UserRouter)

app.get('/', (req, res) => {
    res.send("welcome")
})


app.listen(port, (res, req) => {
  console.log(`Example app listening at http://localhost:${port}`);
});
