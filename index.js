const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-streams-adapter");

const mongoose = require("mongoose");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const db = require("./db/db");
const errorHandler = require("./errorHandler");
const { client } = require("./db/redis");
const app = express();
const port = 5000;
const { graphqlHTTP } = require("express-graphql");
const { root, schema } = require("./routes/graphql/root/root");

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(db, {});

process.on("uncaughtException", function (error) {
  console.log(error.stack);
});

(async () => {
  await client.connect();
  client.flushDb();
})();

const io = new Server({
  adapter: createAdapter(client),
});

io.on("connection", (socket) => {
  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
});

client.on("error", (err) => console.log("Redis error " + err));
client.on("connect", () => console.log("Redis Connected"));
client.on("ready", () => {
  console.log("Redis Ready");
});

const UserRouter = require("./routes/user/user");
const RoomRouter = require("./routes/room/room");
const ParticipantRouter = require("./routes/participant/participant");
const MessageRouter = require("./routes/message/message");

app.use("/user/", UserRouter);
app.use("/room/", RoomRouter);
app.use("/participant/", ParticipantRouter);
app.use("/message/", MessageRouter);

// GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server Working");
});

app.use(errorHandler);

app.listen(port, (res, req) => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log(mongoose.connection.readyState);
});
