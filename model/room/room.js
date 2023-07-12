const mongoose = require("mongoose");

const RoomScheme = mongoose.Schema(
  {
    roomName: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", RoomScheme);
