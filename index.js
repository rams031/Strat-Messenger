const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Server } = require("socket.io");
const { createServer } = require("http");
const mongoose = require("mongoose");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");

const db = require("./db/db");
const errorHandler = require("./errorHandler");
const { client } = require("./db/redis");
const { graphqlHTTP } = require("express-graphql");
const { root, schema } = require("./routes/graphql/root/root");

const app = express();
const port = process.env.PORT || 3000;;

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// * connnect to redis
const pubClient = client;
const subClient = pubClient.duplicate();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
  transports: ["websocket"],
});

// Connect to redis
Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  pubClient.flushDb();
  io.adapter(createAdapter(pubClient, subClient));
  io.listen(16518);
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("send-message", (roomId) => {
    io.to(roomId).emit("message", "message sent");
  });

  socket.on("typing-action-room", (data) => {
    const { roomId, email } = data || {};
    io.to(roomId).emit("typing-event", data);
  });

  socket.onAny((eventName, ...args) => {
    console.log(`eventName:`, eventName)
    console.log(`args:`, args)
    // ...
  });
});

// Global Socket
global.io = io;

process.on("uncaughtException", function (error) {
  console.log(error.stack);
});

mongoose
  .connect(db, {})
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    throw error;
  });

const UserRouter = require("./routes/user/user");
const RoomRouter = require("./routes/room/room");
const ParticipantRouter = require("./routes/participant/participant");
const MessageRouter = require("./routes/message/message");
const { createAdapter } = require("@socket.io/redis-streams-adapter");

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

server.listen(port, (res, req) => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log(mongoose.connection.readyState);
});
