const mongoose = require("mongoose");

const MessageScheme = mongoose.Schema(
  {
    userId: {
      type: String,
    },
    roomId: {
        type: String,
      },
    userType: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageScheme);