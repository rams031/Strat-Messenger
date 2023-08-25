const router = require("express").Router();
const Mongoose = require("mongoose");
const RoomModel = require("./../../model/room/room");
const ParticipantModel = require("./../../model/participant/participant");
const UserModel = require("../../model/user/user");

const auth = require("./../../middleware/auth");
const { create, view, login } = require("./../../action/action");

router.get("/", (req, res, next) => {
  const getAllRoom = view(RoomModel, res, req, next);
  return getAllRoom;
});

router.get("/chatRoom", auth, (req, res, next) => {
  const { _id } = req.user;
  console.log(`_id:`, _id)
  const customId = new Mongoose.Types.ObjectId(_id);

  ParticipantModel.aggregate([
    {
      $match: { userId: customId },
    },
    {
      $group: {
        _id: { roomId: "$roomId", userId: "$userId", userType: "$userType" },
        count: { $sum: 1 },
      },
    },
    // {
    //   $lookup: {
    //     from: "users",
    //     localField: "_id.userId",
    //     foreignField: "_id",
    //     as: "roomDetails",
    //   },
    // },
    {
      $lookup: {
        from: "rooms",
        localField: "_id.roomId",
        foreignField: "_id",
        as: "roomDetails",
      },
    },
    { 
      $sort: { "_id": -1 } 
    },
    // {
    //   $project: {
    //     roomId: 1,
    //   },
    // },
  ])
    .then((data) => {
      console.log(`data:`, data)
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post("/createroom", auth, async (req, res, next) => {
  const { roomName, participants } = req.body;
  const { _id: userId } = req.user;

  await RoomModel.create({ roomName })
    .then(async (response) => {
      const { _id } = response || {};
      if (!_id) return res.status(400).send({ message: "Having Problem" });

      const convertedParticipants = [userId.toString(), ...participants];

      const listOfParticipant = convertedParticipants.map((participant) => {
        return {
          userId: participant,
          roomId: _id.toString(),
          userType: "Admin",
        };
      });

      await ParticipantModel.insertMany(listOfParticipant).then((result) => {
        res.status(201).send(result);
      });
    })
    .catch((err) => {
      console.log(`err:`, err);
      return next(err);
    });
});

module.exports = router;
