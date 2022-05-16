const mongoose = require("mongoose");

const collectedRecordSchema = mongoose.Schema(
  {
    album_type: {
      type: String,
      required: [true, "Please add an album_type field"],
    },
    artists: [
      {
        external_urls: { spotify: String },
        href: String,
        id: String,
        name: String,
        type: String,
        uri: String,
      },
    ],
    spotify_url: String, // external_urls.spotify
    href: String,
    spotify_id: {
      type: String,
      required: [true, "Please add an spotify_id field"],
    },
    images: [
      { height: Number, url: String, width: Number },
      { height: Number, url: String, width: Number },
      { height: Number, url: String, width: Number },
    ],
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
