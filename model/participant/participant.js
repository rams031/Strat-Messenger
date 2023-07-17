const mongoose = require("mongoose");

const ParticipantScheme = mongoose.Schema(
	{
		userId: {
			type: String,
			ref: "User",
		},
		roomId: {
			type: String,
			ref: "Room",
		},
		userType: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Participant", ParticipantScheme);
