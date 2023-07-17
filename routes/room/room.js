const router = require("express").Router();
const RoomModel = require("./../../model/room/room");
const ParticipantModel = require("./../../model/participant/participant");

const auth = require("./../../middleware/auth");
const { create, view, login } = require("./../../action/action");
const user = require("../../model/user/user");

router.get("/", (req, res, next) => {
	console.log("working");
	res.status(200).send({ message: "Testing Water for Room" });
});

router.post("/createroom", auth, async (req, res, next) => {
	const { roomName, participants } = req.body;

	await user
		.find({ _id: participants })
		.then(() => {
			RoomModel.create({ ...roomName })
				.then(async (response) => {
					const { _id } = response || {};
					if (!_id) return res.status(400).send({ message: "Having Problem" });

					const convertedParticipants = [];

					participants.map((participant) => {
						const formatted = {
							userId: participant,
							roomId: _id,
							userType: "Admin",
						};
						return convertedParticipants.push(formatted);
					});

					await ParticipantModel.insertMany(convertedParticipants).then(
						(result) => {
							res.status(201).send(result);
						}
					);
				})
				.catch((err) => {
					return next(err);
				});
		})
		.catch((err) => {
			console.log(err);
			return res.status(422).send({ message: "Invalid participants" });
		});
});

module.exports = router;
