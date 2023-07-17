const router = require("express").Router();
const RoomModel = require("./../../model/room/room");
const ParticipantModel = require("./../../model/participant/participant");

const auth = require("./../../middleware/auth");
const { create, view, login } = require("./../../action/action");
const UserModel = require("../../model/user/user");

router.get("/", (req, res, next) => {
  console.log("working");
  res.status(200).send({ message: "Testing Water for Room" });
});

router.post("/createroom", auth, async (req, res, next) => {
  const { roomName, participants, user } = req.body;
  const { _id: userId } = req.user;

  await RoomModel.create({ ...roomName })
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

      await ParticipantModel.insertMany(listOfParticipant).then(
        (result) => {
          res.status(201).send(result);
        }
      );
    })
    .catch((err) => {
      return next(err);
    });
});

module.exports = router;
