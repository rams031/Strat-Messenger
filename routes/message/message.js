const router = require("express").Router();
const Mongoose = require("mongoose");
const MessageModel = require("./../../model/message/message");

const auth = require("./../../middleware/auth");
const { view, viewId } = require("./../../action/action");
const { client } = require("../../db/redis");
const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-streams-adapter");

router.get("/", (req, res, next) => {
  const getAllMessage = view(MessageModel, res, next);
  return getAllMessage;
});

router.get("/:id", auth, (req, res, next) => {
  const { id } = req.params || {};
  const customId = new Mongoose.Types.ObjectId(id);

  MessageModel.aggregate([
    {
      $match: { roomId: customId },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
  ])
    .then((response) => {
      return res.status(200).send(response);
    })
    .catch((err) => {
      return next(err);
    });
});

router.post("/sendmessage", auth, (req, res) => {
  const { _id: userId } = req.user;
  const { message, roomId } = req.body;

  const messageDataSet = {
    roomId: roomId,
    userId: userId,
    messageDescription: message,
  };

  MessageModel.create(messageDataSet)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      return next(err);
    });
});

module.exports = router;
