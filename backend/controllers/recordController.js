const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();

const Record = require("../models/recordModel");
const User = require("../models/userModel");
const { findOne, findOneAndUpdate } = require("../models/recordModel");
const { faSave } = require("@fortawesome/free-solid-svg-icons");

//description: GET record collection
//@ route GET /api/records
// https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/
const getRecordCollection = asyncHandler(async (req, res) => {
  const user = await User.find({ userName: req.body.userName });
  const { _id, userName } = user[0];
  console.log(_id);
  console.log(userName);
  const records = await Record.find({ collectedUsers: _id }); // need to reference collectedUser

  res.status(200).json(records);
});

//description: update record or create record if it does not exist
//@ route PUT /api/records
const checkForAndUpdateOrAddRecord = asyncHandler(async (req, res) => {
  const query = { name: req.body.name, spotify_id: req.body.spotify_id };

  const newRecord = {
    album_type: req.body.album_type,
    artist: req.body.artists,
    spotify_url: req.body.spotify_url,
    href: req.body.href,
    spotify_id: req.body.spotify_id,
    images: req.body.images,
    name: req.body.name,
    release_date: req.body.release_date,
    total_tracks: req.body.total_tracks,
    type: req.body.type,
    uri: req.body.uri,
  };

  const updateParameters = req.body.collectedUsers // check if PUT is for collected or wishlisted user
    ? { collectedUsers: req.user.id }
    : { wishlistedUsers: req.user.id };
  const updatedOrNewRecord = await Record.updateOne(
    query,
    {
      $push: { ...updateParameters },
      $setOnInsert: newRecord,
    },
    { upsert: true }
  );

  if (updatedOrNewRecord.upsertedCount === 1) {
    res.status(201).json({ message: "New Record added" });
  }

  if (updatedOrNewRecord.modifiedCount === 1) {
    res.status(200).json({ message: "Record updated" });
  }
});

const checkForAndUpdateOrDeleteRecord = asyncHandler(async (req, res) => {
  const updateParameters = req.body.collectedUsers // check if PUT is for collected or wishlisted user
    ? { collectedUsers: req.user.id }
    : { wishlistedUsers: req.user.id };

  const updatedRecord = await Record.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { ...updateParameters } },
    { new: true }
  );

  if (
    updatedRecord.collectedUsers.length === 0 &&
    updatedRecord.wishlistedUsers.length === 0
  ) {
    await updatedRecord.remove();
    res.status(200).json({ message: "User and Record deleted" });
  } else {
    res.status(200).json({ message: "User deleted from record" });
  }
});

module.exports = {
  getRecordCollection,
  checkForAndUpdateOrAddRecord,
  checkForAndUpdateOrDeleteRecord,
};
