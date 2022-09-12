const mongoose = require("mongoose");

const collectedRecordSchema = mongoose.Schema(
  {
    users: [],
    album_type: {
      type: String,
      required: [true, "Please add an album_type field"],
    },
    artists: [],
    spotify_url: String, // external_urls.spotify
    href: String,
    spotify_id: {
      type: String,
      required: [true, "Please add an spotify_id field"],
    },
    images: [],
    name: {
      type: String,
      required: [true, "Please add a name field"],
    },
    release_date: String,
    total_tracks: Number,
    type: String,
    uri: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("collectedrecord", collectedRecordSchema);
