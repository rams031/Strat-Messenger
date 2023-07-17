const router = require("express").Router();
const RoomModel = require("./../../model/room/room");
const ParticipantModel = require("./../../model/participant/participant");

const auth = require("./../../middleware/auth");
const { view } = require("./../../action/action");

router.get("/chats", auth, async (req, res, next) => {
	const { _id: userId } = req.user;

	const getAllParticipant = await ParticipantModel.find({
		userId: userId,
	})
		.populate({
			path: "roomId",
			select: ["roomName"],
		})
		.exec();
	console.log(getAllParticipant);
	return res.send(getAllParticipant);
});

router.get("/", auth, (req, res, next) => {
	const getAllParticipant = view(ParticipantModel, res, next);
	return getAllParticipant;
});
module.exports = router;
