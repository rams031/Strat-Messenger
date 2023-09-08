const router = require("express").Router();
const RoomModel = require("./../../model/room/room");
const ParticipantModel = require("./../../model/participant/participant");

const auth = require("./../../middleware/auth");
const { view, viewId } = require("./../../action/action");

router.get("/chats", async (req, res, next) => {
  const { _id: userId } = req.user;

  const getAllParticipant = await ParticipantModel.find({
    userId: userId,
  })
    .populate({
      path: "roomId",
      select: ["roomName"],
    })
    .exec();

  return res.status(200).send(getAllParticipant);
});

router.get("/room-participant/:id", auth, (req, res, next) => {
  const { id } = req.params || {};
  const params = {
    roomId: id,
  };

  const getSpecificParticipant = viewId(
    ParticipantModel,
    params,
    res,
    req,
    next
  );
  return getSpecificParticipant;
});

router.get("/", (req, res, next) => {
  const getAllParticipant = view(ParticipantModel, res, next);
  return getAllParticipant;
});
module.exports = router;
