const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParticipantScheme = mongoose.Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userType: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Participant", ParticipantScheme);
