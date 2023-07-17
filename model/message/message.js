const mongoose = require("mongoose");

const MessageScheme = mongoose.Schema(
	{
		roomId: {
			type: String,
			required: true,
			ref: "Room",
		},
		messageDescription: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Message", MessageScheme);
