const mongoose = require("mongoose");

const recordSchema = mongoose.Schema(
  {
    artist: String,
    images: Object,
    name: {
      type: String,
      required: [true, "Please add a name field"],
    },
    url: String,
    collectedUsers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "user", unique: true },
    ],
    wishlistedUsers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "user", unique: true },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("record", recordSchema);
