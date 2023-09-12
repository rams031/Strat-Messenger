const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageScheme = mongoose.Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Room",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
      messageDescription: String,
      imageUrl: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageScheme);
