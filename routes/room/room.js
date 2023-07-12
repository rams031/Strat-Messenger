const router = require("express").Router();
const RoomModel = require("./../../model/room/room");
const ParticipantModel = require("./../../model/participant/participant");

const auth = require("./../../middleware/auth");
const { create, view, login } = require("./../../action/action");

router.get("/", (req, res, next) => {
  console.log("working");
});

router.post("/createroom", auth, (req, res, next) => {
  const params = { roomName: "testRoom1" };

  RoomModel.create(params)
    .then((response) => {
      const { _id } = response || {};
      console.log(`_id:`, _id);

      if (!_id) return res.status(400).send({ message: "Having Problem" });

      //   const participantParams =  { roomId: _id, userId:  }

      ParticipantModel.create();

      console.log("_id", _id);
    })
    .catch((err) => {
      return next(err);
    });
});

module.exports = router;
