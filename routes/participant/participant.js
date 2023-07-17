const router = require("express").Router();
const RoomModel = require("./../../model/room/room");
const ParticipantModel = require("./../../model/participant/participant");

const auth = require("./../../middleware/auth");
const { view } = require("./../../action/action");

router.get("/", auth, (req, res, next) => {
  const getAllParticipant = view(ParticipantModel, res, next);
  return getAllParticipant;
});

router.get("/", auth, (req, res, next) => {
    
    const getAllParticipant = view(ParticipantModel, res, next);
    return getAllParticipant;
  });
module.exports = router;
